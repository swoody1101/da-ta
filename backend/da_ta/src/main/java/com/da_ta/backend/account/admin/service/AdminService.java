package com.da_ta.backend.account.admin.service;

import com.da_ta.backend.account.admin.controller.dto.*;
import com.da_ta.backend.account.jwt.JwtTokenProvider;
import com.da_ta.backend.account.user.controller.dto.BanStatusInfo;
import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.account.user.domain.repository.UserRepository;
import com.da_ta.backend.common.domain.Message;
import com.da_ta.backend.common.domain.exception.NotFoundException;
import com.da_ta.backend.letter.domain.entity.ImageLetter;
import com.da_ta.backend.letter.domain.entity.Letter;
import com.da_ta.backend.letter.domain.entity.LetterAccusation;
import com.da_ta.backend.letter.domain.entity.TextLetter;
import com.da_ta.backend.letter.domain.repository.ImageLetterRepository;
import com.da_ta.backend.letter.domain.repository.LetterAccusationRepository;
import com.da_ta.backend.letter.domain.repository.LetterRepository;
import com.da_ta.backend.letter.domain.repository.TextLetterRepository;
import com.da_ta.backend.question.domain.entity.TodayQuestion;
import com.da_ta.backend.question.domain.repository.TodayQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.stream.Collectors;

import static com.da_ta.backend.common.domain.ErrorCode.*;
import static com.da_ta.backend.common.domain.SuccessCode.ACCUSED_LETTER_SOLVED;
import static com.da_ta.backend.common.domain.SuccessCode.ROLE_UPDATED;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final int MAX_WARNING_COUNT = 3;
    private final static String TYPE_TEXT = "Text";
    private final static String TYPE_IMAGE = "Image";
    private final UserRepository userRepository;
    private final LetterRepository letterRepository;
    private final TextLetterRepository textLetterRepository;
    private final ImageLetterRepository imageLetterRepository;
    private final TodayQuestionRepository todayQuestionRepository;
    private final LetterAccusationRepository letterAccusationRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public FindUsersResponse findUsers(String token) {
        jwtTokenProvider.findUserByToken(token);
        return FindUsersResponse.builder()
                .users(userRepository.findAll()
                        .stream()
                        .map(user -> UserItem.builder()
                                .userId(user.getId())
                                .kakaoUserId(user.getKakaoUserId())
                                .nickname(user.getNickname())
                                .ageRange(user.getAge().getAgeRange())
                                .role(user.getRole())
                                .isActive(user.isActive())
                                .banStatus(BanStatusInfo.builder()
                                        .isBan(user.getBanStatus().isBan())
                                        .build())
                                .build()
                        ).collect(Collectors.toList()))
                .build();
    }

    public Message updateRole(String token, Long userId, UpdateRoleRequest updateRoleRequest) {
        jwtTokenProvider.findUserByToken(token);
        User user = findUserById(userId);
        user.updateRole(updateRoleRequest.getRole());
        userRepository.save(user);
        return new Message(ROLE_UPDATED.getMessage());
    }

    public FindAccusedLettersResponse findAccusedLetters(String token) {
        jwtTokenProvider.findUserByToken(token);
        return FindAccusedLettersResponse.builder()
                .accusedLetters(letterAccusationRepository.findAll()
                        .stream()
                        .map(accusedLetter -> {
                            Letter letter = findLetterById(accusedLetter.getLetter().getId());
                            User reportedUser = findUserById(letter.getWriter().getId());
                            String content;
                            if (letter.getLetterType().equals(TYPE_TEXT)) {
                                content = findTextLetterById(letter.getId()).getContent();
                            } else if (letter.getLetterType().equals(TYPE_IMAGE)) {
                                content = findImageLetterById(letter.getId()).getImageLetterUrl();
                            } else {
                                throw new NotFoundException(LETTER_TYPE_NOT_FOUND);
                            }
                            return AccusedLetter.builder()
                                    .accusedLetterId(accusedLetter.getId())
                                    .reportedTime(accusedLetter.getCreatedDate())
                                    .reporterNickname(findUserById(accusedLetter.getReporterId()).getNickname())
                                    .reportedUserId(reportedUser.getId())
                                    .reportedNickname(reportedUser.getNickname())
                                    .reason(accusedLetter.getReason())
                                    .content(content)
                                    .isSolved(accusedLetter.isSolved())
                                    .build();
                        })
                        .collect(Collectors.toList()))
                .build();
    }

    @Transactional
    public Message updateAccusedLetter(String token, Long letterAccusationId) {
        jwtTokenProvider.findUserByToken(token);
        LetterAccusation letterAccusation = findLetterAccusationById(letterAccusationId);
        letterAccusation.updateIsSolved();
        User reportedUser = findUserById(findLetterById(letterAccusation.getLetter().getId()).getWriter().getId());
        reportedUser.getBanStatus().updateWarningCount();
        if (reportedUser.getBanStatus().getWarningCount() == MAX_WARNING_COUNT) {
            reportedUser.getBanStatus().updateIsBan();
        }
        letterAccusationRepository.save(letterAccusation);
        userRepository.save(reportedUser);
        return new Message(ACCUSED_LETTER_SOLVED.getMessage());
    }

    public FindTodayQuestionsResponse findTodayQuestions(String token, String date) {
        jwtTokenProvider.findUserByToken(token);
        return FindTodayQuestionsResponse.builder()
                .questions(todayQuestionRepository.findTodayQuestionsByYearAndMonth(date)
                        .stream()
                        .map(todayQuestion -> TodayQuestionItem.builder()
                                .todayQuestionId(todayQuestion.getId())
                                .question(todayQuestion.getQuestion())
                                .date(todayQuestion.getDate())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    public TodayQuestionItem findTodayQuestion(String token, Long questionId) {
        jwtTokenProvider.findUserByToken(token);
        TodayQuestion todayQuestion = findTodayQuestionById(questionId);
        return TodayQuestionItem.builder()
                .todayQuestionId(todayQuestion.getId())
                .question(todayQuestion.getQuestion())
                .date(todayQuestion.getDate())
                .build();
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
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

    private LetterAccusation findLetterAccusationById(Long accusationId) {
        return letterAccusationRepository.findById(accusationId)
                .orElseThrow(() -> new NotFoundException(ACCUSED_LETTER_NOT_FOUND));
    }

    private TodayQuestion findTodayQuestionById(Long todayQuestionId) {
        return todayQuestionRepository.findById(todayQuestionId)
                .orElseThrow(() -> new NotFoundException(TODAY_QUESTION_NOT_FOUND));
    }
}
