package com.da_ta.backend.letter.service;

import com.da_ta.backend.account.jwt.JwtTokenProvider;
import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.common.domain.Age;
import com.da_ta.backend.common.domain.Message;
import com.da_ta.backend.common.domain.exception.BadRequestException;
import com.da_ta.backend.common.domain.exception.NotFoundException;
import com.da_ta.backend.letter.controller.dto.*;
import com.da_ta.backend.letter.controller.dto.common.*;
import com.da_ta.backend.letter.domain.entity.*;
import com.da_ta.backend.letter.domain.repository.*;
import com.da_ta.backend.util.Base64Util;
import com.da_ta.backend.util.DetectSafeSearchUtil;
import com.da_ta.backend.util.KMPUtil;
import com.da_ta.backend.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

import static com.da_ta.backend.common.domain.ErrorCode.*;
import static com.da_ta.backend.common.domain.SuccessCode.*;

@RequiredArgsConstructor
@Service
public class LetterService {

    private static final int MAX_FLOAT_COUNT = 10;
    private static final String TYPE_TEXT = "Text";
    private static final String TYPE_IMAGE = "Image";
    private static final String BAD_WORDS_KEY = "Bad words";

    private final JwtTokenProvider jwtTokenProvider;
    private final CollectedLetterRepository collectedLetterRepository;
    private final FloatedLetterRepository floatedLetterRepository;
    private final FloatedLetterLogRepository floatedLetterLogRepository;
    private final ImageLetterRepository imageLetterRepository;
    private final LetterAccusationRepository letterAccusationRepository;
    private final LetterRepository letterRepository;
    private final ReplyRepository replyRepository;
    private final TextLetterRepository textLetterRepository;

    @Transactional
    public Message createTextLetter(User user, TextLetterCreateRequest textLetterCreateRequest) {
        Option option = textLetterCreateRequest.getOption();
        TextLetterInfo textLetterInfo = textLetterCreateRequest.getTextLetterInfo();
        TextLetter textLetter = TextLetter.builder()
                .letterType(TYPE_TEXT)
                .writer(user)
                .ageOption(option.getAgeOption())
                .replyOption(option.getReplyOption())
                .backgroundId(textLetterInfo.getBackgroundId())
                .title(textLetterInfo.getTitle())
                .content(textLetterInfo.getContent())
                .fontId(textLetterInfo.getFontId())
                .build();
        textLetterRepository.save(textLetter);
        floatLetter(textLetter);
        return new Message(TEXT_LETTER_FLOATED.getMessage());
    }

    @Transactional
    public Message createImageLetter(User user, ImageLetterCreateRequest imageLetterCreateRequest) {
        Option option = imageLetterCreateRequest.getOption();
        ImageLetterInfo imageLetterInfo = imageLetterCreateRequest.getImageLetterInfo();
        ImageLetter imageLetter = ImageLetter.builder()
                .letterType(TYPE_IMAGE)
                .writer(user)
                .ageOption(option.getAgeOption())
                .replyOption(option.getReplyOption())
                .backgroundId(imageLetterInfo.getBackgroundId())
                .title(imageLetterInfo.getTitle())
                .imageLetterUrl(imageLetterInfo.getImageLetterUrl())
                .build();
        imageLetterRepository.save(imageLetter);
        floatLetter(imageLetter);
        return new Message(IMAGE_LETTER_FLOATED.getMessage());
    }

    public CountFloatedLetterResponse countFloatedLetter() {
        return CountFloatedLetterResponse.builder()
                .letterCount(floatedLetterRepository.countByIsActiveTrueAndRecipientIdIsNull())
                .build();
    }

    @Transactional
    public ReceiveFloatedLetterResponse receiveFloatedLetter(User recipient) {
        FloatedLetter floatedLetter = floatedLetterRepository.findByRecipientId(recipient.getId());
        if (floatedLetter == null) {
            floatedLetter = findFloatedLetterByRecipientIdAndAgeOption(recipient.getId(), recipient.getAge());
            floatedLetter.updateRecipient(recipient);
            floatedLetterRepository.save(floatedLetter);
            floatedLetterLogRepository.save(FloatedLetterLog.builder()
                    .loggedRecipientId(recipient.getId())
                    .floatedLetter(floatedLetter)
                    .build());
        }
        long letterId = floatedLetter.getLetter().getId();
        Letter letter = findLetterById(letterId);
        if (letter.getLetterType().equals(TYPE_TEXT)) {
            TextLetter textLetter = findTextLetterById(letterId);
            return ReceiveFloatedLetterResponse.builder()
                    .writerId(textLetter.getWriter().getId())
                    .writerNickname(textLetter.getWriter().getNickname())
                    .replyOption(textLetter.isReplyOption())
                    .letterInfo(LetterInfo.builder()
                            .letterId(textLetter.getId())
                            .title(textLetter.getTitle())
                            .content(textLetter.getContent())
                            .backgroundId(textLetter.getBackgroundId())
                            .fontId(textLetter.getFontId())
                            .writtenDate(textLetter.getCreatedDate())
                            .build())
                    .build();
        } else if (letter.getLetterType().equals(TYPE_IMAGE)) {
            ImageLetter imageLetter = findImageLetterById(letterId);
            return ReceiveFloatedLetterResponse.builder()
                    .writerId(imageLetter.getWriter().getId())
                    .writerNickname(imageLetter.getWriter().getNickname())
                    .replyOption(imageLetter.isReplyOption())
                    .letterInfo(LetterInfo.builder()
                            .letterId(imageLetter.getId())
                            .title(imageLetter.getTitle())
                            .imageLetterUrl(imageLetter.getImageLetterUrl())
                            .backgroundId(imageLetter.getBackgroundId())
                            .writtenDate(imageLetter.getCreatedDate())
                            .build())
                    .build();
        } else {
            throw new NotFoundException(LETTER_TYPE_NOT_FOUND);
        }
    }

    @Transactional
    public Message createReply(User writer, Long originLetterId, CreateReplyRequest createReplyRequest) {
        FloatedLetter floatedLetter = findFloatedLetterByLetterIdAndRecipientId(originLetterId, writer.getId());
        floatedLetter.updateFloatedLetter();
        floatedLetterRepository.save(floatedLetter);
        TextLetterInfo textLetterInfo = createReplyRequest.getTextLetterInfo();
        TextLetter textLetter = TextLetter.builder()
                .letterType(TYPE_TEXT)
                .writer(writer)
                .title(textLetterInfo.getTitle())
                .content(textLetterInfo.getContent())
                .backgroundId(textLetterInfo.getBackgroundId())
                .fontId(textLetterInfo.getFontId())
                .build();
        textLetterRepository.save(textLetter);
        replyRepository.save(Reply.builder()
                .recipient(floatedLetter.getLetter().getWriter())
                .originLetterId(originLetterId)
                .repliedLetter(textLetter)
                .build());
        return new Message(REPLY_SENT.getMessage());
    }

    public Message updateFloatedLetter(User user, Long letterId) {
        FloatedLetter floatedLetter = findFloatedLetterByLetterIdAndRecipientId(letterId, user.getId());
        if (floatedLetterLogRepository.countByFloatedLetterId(floatedLetter.getId()) == MAX_FLOAT_COUNT) {
            floatedLetter.deleteFloatedLetter();
        }
        floatedLetter.updateRecipient(null);
        floatedLetterRepository.save(floatedLetter);
        return new Message(LETTER_REFLOATED.getMessage());
    }

    @Transactional
    public Message collectLetter(User user, Long letterId) {
        Letter letter = findLetterById(letterId);
        if (letter.isReplyOption()) {
            throw new BadRequestException(COLLECT_LETTER_REJECTED);
        }
        FloatedLetter floatedLetter = findFloatedLetterByLetterIdAndRecipientId(letterId, user.getId());
        floatedLetter.updateFloatedLetter();
        floatedLetterRepository.save(floatedLetter);
        collectedLetterRepository.save(CollectedLetter.builder()
                .letter(letter)
                .user(user)
                .build());
        return new Message(LETTER_COLLECTED.getMessage());
    }

    public Message createLetterAccusation(User reporter, Long letterId, AccuseLetterRequest accuseLetterRequest) {
        if (accuseLetterRequest.getIsReply()) {
            Reply reply = findReplyByRepliedLetterIdAndRecipientId(letterId, reporter.getId());
            reply.deleteReplyLetter();
            replyRepository.save(reply);
        } else {
            FloatedLetter floatedLetter = findFloatedLetterByLetterIdAndRecipientId(letterId, reporter.getId());
            floatedLetter.updateRecipient(null);
            floatedLetterRepository.save(floatedLetter);
        }
        letterAccusationRepository.save(LetterAccusation.builder()
                .letter(findLetterById(letterId))
                .reporterId(reporter.getId())
                .reason(accuseLetterRequest.getReason())
                .build());
        return new Message(LETTER_ACCUSED.getMessage());
    }

    public void floatLetter(Letter letter) {
        floatedLetterRepository.save(FloatedLetter.builder()
                .letter(letter)
                .build());
    }

    public FindLetterCollectionResponse findLetterCollection(User user) {
        return FindLetterCollectionResponse.builder()
                .collection(collectedLetterRepository.findAllByUserIdAndIsActiveTrueOrderByCreatedDateDesc(user.getId())
                        .stream()
                        .map(collectedLetter ->
                                CollectionItem.builder()
                                        .id(collectedLetter.getLetter().getId())
                                        .title(collectedLetter.getLetter().getTitle())
                                        .writerId(collectedLetter.getLetter().getWriter().getId())
                                        .writerNickname(collectedLetter.getLetter().getWriter().getNickname())
                                        .writtenDate(collectedLetter.getLetter().getCreatedDate())
                                        .build()
                        ).collect(Collectors.toList()))
                .build();
    }

    public FindCollectedLetterDetailResponse findCollectedLetterDetail(User user, Long letterId) {
        Letter letter = findCollectionByLetterIdAndUserId(letterId, user.getId()).getLetter();
        if (letter.getLetterType().equals(TYPE_TEXT)) {
            TextLetter textLetter = findTextLetterById(letterId);
            return FindCollectedLetterDetailResponse.builder()
                    .letterType(TYPE_TEXT)
                    .writerId(textLetter.getWriter().getId())
                    .writerNickname(textLetter.getWriter().getNickname())
                    .letterInfo(LetterInfo.builder()
                            .letterId(textLetter.getId())
                            .title(textLetter.getTitle())
                            .content(textLetter.getContent())
                            .backgroundId(textLetter.getBackgroundId())
                            .fontId(textLetter.getFontId())
                            .writtenDate(textLetter.getCreatedDate())
                            .build())
                    .build();
        } else if (letter.getLetterType().equals(TYPE_IMAGE)) {
            ImageLetter imageLetter = findImageLetterById(letterId);
            return FindCollectedLetterDetailResponse.builder()
                    .letterType(TYPE_IMAGE)
                    .writerId(imageLetter.getWriter().getId())
                    .writerNickname(imageLetter.getWriter().getNickname())
                    .letterInfo(LetterInfo.builder()
                            .letterId(imageLetter.getId())
                            .title(imageLetter.getTitle())
                            .imageLetterUrl(imageLetter.getImageLetterUrl())
                            .backgroundId(imageLetter.getBackgroundId())
                            .writtenDate(imageLetter.getCreatedDate())
                            .build())
                    .build();
        } else {
            throw new NotFoundException(LETTER_TYPE_NOT_FOUND);
        }
    }

    public Message deleteCollectedLetter(User user, Long letterId) {
        CollectedLetter collectedLetter = findCollectionByLetterIdAndUserId(letterId, user.getId());
        collectedLetter.deleteCollectedLetter();
        collectedLetterRepository.save(collectedLetter);
        return new Message(COLLECTED_LETTER_DELETED.getMessage());
    }

    public FindUnreadReplyResponse checkUnreadReply(User recipient) {
        return FindUnreadReplyResponse.builder()
                .isUnreadReply(replyRepository.existsByIsReadFalseAndIsActiveTrueAndRecipientId(recipient.getId()))
                .build();
    }

    public FindRepliesResponse findReplies(User recipient) {
        return FindRepliesResponse.builder()
                .replies(replyRepository.findAllByRecipientIdAndIsActiveTrueOrderByCreatedDateDesc(recipient.getId())
                        .stream()
                        .map(reply ->
                                ReplyItem.builder()
                                        .id(reply.getRepliedLetter().getId())
                                        .title(reply.getRepliedLetter().getTitle())
                                        .writerId(reply.getRepliedLetter().getWriter().getId())
                                        .writerNickname(reply.getRepliedLetter().getWriter().getNickname())
                                        .writtenDate(reply.getRepliedLetter().getCreatedDate())
                                        .isRead(reply.isRead())
                                        .build())
                        .collect(Collectors.toList()))
                .build();
    }

    public FindReplyDetailResponse findReplyDetail(User recipient, Long repliedLetterId) {
        Reply reply = findReplyByRepliedLetterIdAndRecipientId(repliedLetterId, recipient.getId());
        reply.updateIsRead();
        replyRepository.save(reply);
        Long originLetterId = reply.getOriginLetterId();
        Letter originLetter = findLetterById(originLetterId);
        TextLetter replyLetter = findTextLetterById(repliedLetterId);
        ReplyInfo replyInfo = ReplyInfo.builder()
                .writerId(replyLetter.getWriter().getId())
                .writerNickname(replyLetter.getWriter().getNickname())
                .title(replyLetter.getTitle())
                .content(replyLetter.getContent())
                .backgroundId(replyLetter.getBackgroundId())
                .fontId(replyLetter.getFontId())
                .writtenDate(replyLetter.getCreatedDate())
                .build();
        if (originLetter.getLetterType().equals(TYPE_TEXT)) {
            TextLetter textLetter = findTextLetterById(originLetterId);
            return FindReplyDetailResponse.builder()
                    .originLetterInfo(LetterInfo.builder()
                            .letterId(originLetterId)
                            .title(textLetter.getTitle())
                            .backgroundId(textLetter.getBackgroundId())
                            .writtenDate(textLetter.getCreatedDate())
                            .content(textLetter.getContent())
                            .fontId(textLetter.getFontId())
                            .build())
                    .replyInfo(replyInfo)
                    .build();
        } else if (originLetter.getLetterType().equals(TYPE_IMAGE)) {
            ImageLetter imageLetter = findImageLetterById(originLetterId);
            return FindReplyDetailResponse.builder()
                    .originLetterInfo(LetterInfo.builder()
                            .letterId(originLetterId)
                            .title(imageLetter.getTitle())
                            .backgroundId(imageLetter.getBackgroundId())
                            .writtenDate(imageLetter.getCreatedDate())
                            .imageLetterUrl(imageLetter.getImageLetterUrl())
                            .build())
                    .replyInfo(replyInfo)
                    .build();
        } else {
            throw new NotFoundException(LETTER_TYPE_NOT_FOUND);
        }
    }

    public Message deleteReply(User recipient, Long repliedLetterId) {
        Reply reply = findReplyByRepliedLetterIdAndRecipientId(repliedLetterId, recipient.getId());
        reply.deleteReplyLetter();
        replyRepository.save(reply);
        return new Message(REPLY_DELETED.getMessage());
    }

    public Message createBadWordRedisSet(String token, CreateBadWordsRequest createBadWordsRequest) {
        jwtTokenProvider.findUserByToken(token);
        StringTokenizer stringTokenizer = new StringTokenizer(createBadWordsRequest.getBadWords(), ", ");
        List<String> badWords = new ArrayList<>();
        while (stringTokenizer.hasMoreTokens()) {
            badWords.add(stringTokenizer.nextToken());
        }
        if (badWords.isEmpty()) {
            throw new NotFoundException(BAD_WORDS_DUMMY_NOT_FOUND);
        }
        RedisUtil.createSet(BAD_WORDS_KEY, badWords.toArray(new String[badWords.size()]));
        return new Message(BAD_WORD_SET_CREATED.getMessage());
    }

    public CheckTextHarmfulnessResponse checkTextHarmfulness(String token, CheckTextHarmfulnessRequest checkTextHarmfulnessRequest) {
        jwtTokenProvider.findUserByToken(token);
        for (String badWord : RedisUtil.getSet(BAD_WORDS_KEY)) {
            if (KMPUtil.KMP(checkTextHarmfulnessRequest.getContent(), badWord)) {
                return CheckTextHarmfulnessResponse.builder()
                        .isHarmful(true)
                        .build();
            }
        }
        return CheckTextHarmfulnessResponse.builder()
                .isHarmful(false)
                .build();
    }

    public CheckImageLetterResponse checkImageLetter(String token, CheckImageLetterRequest checkImageLetterRequest) throws IOException {
        jwtTokenProvider.findUserByToken(token);
        return DetectSafeSearchUtil.detectSafeSearch(Base64Util.decodeBase64ToBytes(checkImageLetterRequest.getImageDataUrl()));
    }

    private Letter findLetterById(Long letterId) {
        return letterRepository.findById(letterId)
                .orElseThrow(() -> new NotFoundException(LETTER_NOT_FOUND));
    }

    private TextLetter findTextLetterById(Long letterId) {
        return textLetterRepository.findById(letterId)
                .orElseThrow(() -> new NotFoundException(TEXT_LETTER_NOT_FOUND));
    }

    private ImageLetter findImageLetterById(Long letterId) {
        return imageLetterRepository.findById(letterId)
                .orElseThrow(() -> new NotFoundException(IMAGE_LETTER_NOT_FOUND));
    }

    private FloatedLetter findFloatedLetterByLetterIdAndRecipientId(Long floatedLetterId, Long recipientId) {
        return floatedLetterRepository.findByLetterIdAndRecipientId(floatedLetterId, recipientId)
                .orElseThrow(() -> new NotFoundException(FLOATED_LETTER_NOT_FOUND));
    }

    private FloatedLetter findFloatedLetterByRecipientIdAndAgeOption(Long recipientId, Age age) {
        return floatedLetterRepository.findByRecipientIdAndAgeOption(recipientId, age.toString())
                .orElseThrow(() -> new NotFoundException(FLOATED_LETTER_NOT_FOUND));
    }

    private Reply findReplyByRepliedLetterIdAndRecipientId(Long repliedLetterId, Long recipientId) {
        return replyRepository.findByRepliedLetterIdAndRecipientIdAndIsActiveTrue(repliedLetterId, recipientId)
                .orElseThrow(() -> new NotFoundException(REPLY_NOT_FOUND));
    }

    private CollectedLetter findCollectionByLetterIdAndUserId(Long letterId, Long userId) {
        return collectedLetterRepository.findByLetterIdAndUserIdAndIsActiveTrue(letterId, userId)
                .orElseThrow(() -> new NotFoundException(COLLECTED_LETTER_NOT_FOUND));
    }
}
