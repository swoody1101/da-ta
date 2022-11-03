package com.da_ta.backend.letter.service;

import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.account.user.domain.repository.UserRepository;
import com.da_ta.backend.common.domain.Age;
import com.da_ta.backend.common.domain.Message;
import com.da_ta.backend.common.domain.exception.NotFoundException;
import com.da_ta.backend.letter.controller.dto.ImageLetterCreateRequest;
import com.da_ta.backend.letter.controller.dto.ReceiveFloatedLetterResponse;
import com.da_ta.backend.letter.controller.dto.TextLetterCreateRequest;
import com.da_ta.backend.letter.controller.dto.common.ImageLetterInfo;
import com.da_ta.backend.letter.controller.dto.common.LetterInfo;
import com.da_ta.backend.letter.controller.dto.common.Option;
import com.da_ta.backend.letter.controller.dto.common.TextLetterInfo;
import com.da_ta.backend.letter.domain.entity.*;
import com.da_ta.backend.letter.domain.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import static com.da_ta.backend.common.domain.ErrorCode.*;
import static com.da_ta.backend.common.domain.SuccessCode.*;

@RequiredArgsConstructor
@Service
public class LetterService {

    private final static int MAX_FLOAT_COUNT = 5;
    private final static String TYPE_TEXT = "Text";
    private final static String TYPE_IMAGE = "Image";
    private final BackgroundRepository backgroundRepository;
    private final FloatedLetterRepository floatedLetterRepository;
    private final FloatedLetterLogRepository floatedLetterLogRepository;
    private final FontRepository fontRepository;
    private final ImageLetterRepository imageLetterRepository;
    private final LetterRepository letterRepository;
    private final TextLetterRepository textLetterRepository;
    private final UserRepository userRepository;

    @Transactional
    public Message createTextLetter(TextLetterCreateRequest textLetterCreateRequest) {
        Option option = textLetterCreateRequest.getOption();
        TextLetterInfo textLetterInfo = textLetterCreateRequest.getTextLetterInfo();
        TextLetter textLetter = TextLetter.builder()
                .writer(findUser(textLetterCreateRequest.getUserId()))
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
                .writer(findUser(imageLetterCreateRequest.getUserId()))
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
        User recipient = findUser(recipientId);
        FloatedLetter floatedLetter = findFloatedLetterByAge(recipientId, recipient.getAge());
        floatedLetter.updateRecipient(recipient);
        floatedLetterRepository.save(floatedLetter);
        floatedLetterLogRepository.save(FloatedLetterLog.builder()
                .loggedRecipientId(recipientId)
                .floatedLetter(floatedLetter)
                .build());
        Letter letter = letterRepository.findById(floatedLetter.getLetter().getId()).get();
        if (letter.getLetterType().equals(TYPE_TEXT)) {
            TextLetter textLetter = textLetterRepository.findById(floatedLetter.getLetter().getId()).get();
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
            ImageLetter imageLetter = imageLetterRepository.findById(floatedLetter.getLetter().getId()).get();
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

    public Message updateFloatedLetter(Long floatedLetterId) {
        FloatedLetter floatedLetter = findFloatedLetterById(floatedLetterId);
        if (floatedLetterLogRepository.countByFloatedLetterId(floatedLetter.getId()) == MAX_FLOAT_COUNT) {
            floatedLetter.deleteFloatedLetter();
        }
        floatedLetter.updateRecipient(null);
        floatedLetterRepository.save(floatedLetter);
        return new Message(FLOATED_LETTER_NO_CONTENT.getMessage());
    }

    public void floatLetter(Letter letter) {
        floatedLetterRepository.save(FloatedLetter.builder()
                .letter(letter)
                .build());
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
    }

    private Background findBackground(Long backgroundId) {
        return backgroundRepository.findById(backgroundId)
                .orElseThrow(() -> new NotFoundException(BACKGROUND_NOT_FOUND));
    }

    private Font findFont(Long fontId) {
        return fontRepository.findById(fontId)
                .orElseThrow(() -> new NotFoundException(FONT_NOT_FOUND));
    }

    private FloatedLetter findFloatedLetterById(Long floatedLetterId){
        return floatedLetterRepository.findById(floatedLetterId)
                .orElseThrow(() -> new NotFoundException(FLOATED_LETTER_NOT_FOUND));
    }

    private FloatedLetter findFloatedLetterByAge(Long recipientId, Age age) {
        return floatedLetterRepository.findFloatedLetterByAgeOption(recipientId, age.toString())
                .orElseThrow(() -> new NotFoundException(FLOATED_LETTER_NOT_FOUND));
    }
}
