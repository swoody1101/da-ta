package com.da_ta.backend.letter.service;

import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.account.user.domain.repository.UserRepository;
import com.da_ta.backend.common.domain.Age;
import com.da_ta.backend.common.domain.Message;
import com.da_ta.backend.common.domain.exception.BadRequestException;
import com.da_ta.backend.common.domain.exception.NotFoundException;
import com.da_ta.backend.letter.controller.dto.*;
import com.da_ta.backend.letter.controller.dto.common.ImageLetterInfo;
import com.da_ta.backend.letter.controller.dto.common.LetterInfo;
import com.da_ta.backend.letter.controller.dto.common.Option;
import com.da_ta.backend.letter.controller.dto.common.TextLetterInfo;
import com.da_ta.backend.letter.domain.entity.*;
import com.da_ta.backend.letter.domain.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.stream.Collectors;

import static com.da_ta.backend.common.domain.ErrorCode.*;
import static com.da_ta.backend.common.domain.SuccessCode.*;

@RequiredArgsConstructor
@Service
public class LetterService {

    private final static int MAX_FLOAT_COUNT = 5;
    private final static String TYPE_TEXT = "Text";
    private final static String TYPE_IMAGE = "Image";

    private final BackgroundRepository backgroundRepository;
    private final CollectedLetterRepository collectedLetterRepository;
    private final FloatedLetterRepository floatedLetterRepository;
    private final FloatedLetterLogRepository floatedLetterLogRepository;
    private final FontRepository fontRepository;
    private final ImageLetterRepository imageLetterRepository;
    private final LetterAccusationRepository letterAccusationRepository;
    private final LetterRepository letterRepository;
    private final ReplyRepository replyRepository;
    private final TextLetterRepository textLetterRepository;
    private final UserRepository userRepository;

    @Transactional
    public Message createTextLetter(TextLetterCreateRequest textLetterCreateRequest) {
        Option option = textLetterCreateRequest.getOption();
        TextLetterInfo textLetterInfo = textLetterCreateRequest.getTextLetterInfo();
        TextLetter textLetter = TextLetter.builder()
                .writer(findUserById(textLetterCreateRequest.getUserId()))
                .ageOption(option.getAgeOption())
                .replyOption(option.getReplyOption())
                .background(findBackground(textLetterInfo.getBackgroundId()))
                .font(findFont(textLetterInfo.getFontId()))
                .title(textLetterInfo.getTitle())
                .content(textLetterInfo.getContent())
                .build();
        textLetterRepository.save(textLetter);
        floatLetter(textLetter);
        return new Message(TEXT_LETTER_CREATED.getMessage());
    }

    @Transactional
    public Message createImageLetter(ImageLetterCreateRequest imageLetterCreateRequest) {
        Option option = imageLetterCreateRequest.getOption();
        ImageLetterInfo imageLetterInfo = imageLetterCreateRequest.getImageLetterInfo();
        ImageLetter imageLetter = ImageLetter.builder()
                .writer(findUserById(imageLetterCreateRequest.getUserId()))
                .ageOption(option.getAgeOption())
                .replyOption(option.getReplyOption())
                .background(findBackground(imageLetterInfo.getBackgroundId()))
                .title(imageLetterInfo.getTitle())
                .imageLetterUrl(imageLetterInfo.getImageLetterUrl())
                .build();
        imageLetterRepository.save(imageLetter);
        floatLetter(imageLetter);
        return new Message(IMAGE_LETTER_CREATED.getMessage());
    }

    @Transactional
    public ReceiveFloatedLetterResponse receiveFloatedLetter(Long recipientId) {
        User recipient = findUserById(recipientId);
        FloatedLetter floatedLetter = findFloatedLetterByAge(recipientId, recipient.getAge());
        floatedLetter.updateRecipient(recipient);
        floatedLetterRepository.save(floatedLetter);
        floatedLetterLogRepository.save(FloatedLetterLog.builder()
                .loggedRecipientId(recipientId)
                .floatedLetter(floatedLetter)
                .build());
        long letterId = floatedLetter.getLetter().getId();
        Letter letter = findLetterById(letterId);
        if (letter.getLetterType().equals(TYPE_TEXT)) {
            TextLetter textLetter = findTextLetterById(letterId);
            return ReceiveFloatedLetterResponse.builder()
                    .writerId(textLetter.getWriter().getId())
                    .writerNickname(textLetter.getWriter().getNickname())
                    .floatedLetterId(floatedLetter.getId())
                    .letterInfo(LetterInfo.builder()
                            .letterId(textLetter.getId())
                            .title(textLetter.getTitle())
                            .content(textLetter.getContent())
                            .backgroundId(textLetter.getBackground().getBackgroundId())
                            .fontId(textLetter.getFont().getFontId())
                            .createdDate(textLetter.getCreatedDate())
                            .build())
                    .build();
        } else if (letter.getLetterType().equals(TYPE_IMAGE)) {
            ImageLetter imageLetter = findImageLetterById(letterId);
            return ReceiveFloatedLetterResponse.builder()
                    .writerId(imageLetter.getWriter().getId())
                    .writerNickname(imageLetter.getWriter().getNickname())
                    .floatedLetterId(floatedLetter.getId())
                    .letterInfo(LetterInfo.builder()
                            .letterId(imageLetter.getId())
                            .title(imageLetter.getTitle())
                            .imageLetterUrl(imageLetter.getImageLetterUrl())
                            .backgroundId(imageLetter.getBackground().getBackgroundId())
                            .createdDate(imageLetter.getCreatedDate())
                            .build())
                    .build();
        } else {
            throw new NotFoundException(LETTER_TYPE_NOT_FOUND);
        }
    }

    public Message createReply(Long letterId, ReplyCreateRequest replyCreateRequest) {
        TextLetterInfo textLetterInfo = replyCreateRequest.getTextLetterInfo();
        TextLetter textLetter = TextLetter.builder()
                .title(textLetterInfo.getTitle())
                .content(textLetterInfo.getContent())
                .background(findBackground(textLetterInfo.getBackgroundId()))
                .font(findFont(textLetterInfo.getFontId()))
                .build();
        textLetterRepository.save(textLetter);
        replyRepository.save(Reply.builder()
                .recipient(findUserById(replyCreateRequest.getRecipientId()))
                .originLetterId(letterId)
                .reply(textLetter)
                .build());
        return new Message(REPLY_CREATED.getMessage());
    }

    public Message checkReplyReception(Long replyId) {
        Reply reply = findReplyById(replyId);
        reply.updateIsRead();
        replyRepository.save(reply);
        return new Message(REPLY_RECEPTION_CHECK_NO_CONTENT.getMessage());
    }

    public Message updateFloatedLetter(Long floatedLetterId) {
        FloatedLetter floatedLetter = findFloatedLetterById(floatedLetterId);
        if (floatedLetterLogRepository.countByFloatedLetterId(floatedLetter.getId()) == MAX_FLOAT_COUNT) {
            floatedLetter.deleteFloatedLetter();
        }
        floatedLetter.updateRecipient(null);
        floatedLetterRepository.save(floatedLetter);
        return new Message(FLOATED_LETTER_NO_CONTENT.getMessage());
    }

    public Message saveLetter(Long userId, Long letterId) {
        Letter letter = findLetterById(letterId);
        if (letter.isReplyOption()) {
            throw new BadRequestException(COLLECT_BAD_REQUEST);
        }
        collectedLetterRepository.save(CollectedLetter.builder()
                .letter(letter)
                .user(findUserById(userId))
                .build());
        return new Message(COLLECTED_LETTER_CREATED.getMessage());
    }

    public Message createLetterAccusation(Long userId, Long letterId, AccuseLetterRequest accuseLetterRequest) {
        letterAccusationRepository.save(LetterAccusation.builder()
                .letter(findLetterById(letterId))
                .reporterId(userId)
                .reason(accuseLetterRequest.getReason())
                .build());
        return new Message(LETTER_ACCUSATION_CREATED.getMessage());
    }

    public void floatLetter(Letter letter) {
        floatedLetterRepository.save(FloatedLetter.builder()
                .letter(letter)
                .build());
    }

    // 내림차순
    public FindLetterCollectionResponse findLetterCollection(Long userId) {
        return FindLetterCollectionResponse.builder()
                .letters(null)
                .build();
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
    }

    private Letter findLetterById(Long LetterId) {
        return letterRepository.findById(LetterId)
                .orElseThrow(() -> new NotFoundException(LETTER_NOT_FOUND));
    }

    private TextLetter findTextLetterById(Long LetterId) {
        return textLetterRepository.findById(LetterId)
                .orElseThrow(() -> new NotFoundException(TEXT_LETTER_NOT_FOUND));
    }

    private ImageLetter findImageLetterById(Long LetterId) {
        return imageLetterRepository.findById(LetterId)
                .orElseThrow(() -> new NotFoundException(IMAGE_LETTER_NOT_FOUND));
    }

    private Background findBackground(Long backgroundId) {
        return backgroundRepository.findById(backgroundId)
                .orElseThrow(() -> new NotFoundException(BACKGROUND_NOT_FOUND));
    }

    private Font findFont(Long fontId) {
        return fontRepository.findById(fontId)
                .orElseThrow(() -> new NotFoundException(FONT_NOT_FOUND));
    }

    private FloatedLetter findFloatedLetterById(Long floatedLetterId) {
        return floatedLetterRepository.findById(floatedLetterId)
                .orElseThrow(() -> new NotFoundException(FLOATED_LETTER_NOT_FOUND));
    }

    private FloatedLetter findFloatedLetterByAge(Long recipientId, Age age) {
        return floatedLetterRepository.findFloatedLetterByAgeOption(recipientId, age.toString())
                .orElseThrow(() -> new NotFoundException(FLOATED_LETTER_NOT_FOUND));
    }

    private Reply findReplyById(Long replyId) {
        return replyRepository.findById(replyId)
                .orElseThrow(() -> new NotFoundException(REPLY_NOT_FOUND));
    }
}
