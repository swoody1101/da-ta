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
import com.da_ta.backend.question.domain.entity.AnswerAccusation;
import com.da_ta.backend.question.domain.entity.TodayAnswer;
import com.da_ta.backend.question.domain.entity.TodayQuestion;
import com.da_ta.backend.question.domain.repository.AnswerAccusationRepository;
import com.da_ta.backend.question.domain.repository.TodayAnswerRepository;
import com.da_ta.backend.question.domain.repository.TodayQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.stream.Collectors;

import static com.da_ta.backend.common.domain.ErrorCode.*;
import static com.da_ta.backend.common.domain.SuccessCode.*;

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
    private final TodayAnswerRepository todayAnswerRepository;
    private final LetterAccusationRepository letterAccusationRepository;
    private final AnswerAccusationRepository answerAccusationRepository;
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
                .accusedLetters(letterAccusationRepository.findAllByIsActiveTrue()
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
        checkWarningCount(reportedUser);
        letterAccusationRepository.save(letterAccusation);
        userRepository.save(reportedUser);
        return new Message(ACCUSED_LETTER_SOLVED.getMessage());
    }

    public Message deleteAccusedLetter(String token, Long letterAccusationId) {
        jwtTokenProvider.findUserByToken(token);
        LetterAccusation letterAccusation = findLetterAccusationById(letterAccusationId);
        letterAccusation.deleteLetterAccusation();
        letterAccusationRepository.save(letterAccusation);
        return new Message(ACCUSED_LETTER_DELETED.getMessage());
    }

    public FindAccusedAnswersResponse findAccusedAnswers(String token) {
        jwtTokenProvider.findUserByToken(token);
        return FindAccusedAnswersResponse.builder()
                .accusedAnswers(answerAccusationRepository.findAllByIsActiveTrue()
                        .stream()
                        .map(accusedAnswer -> {
                            TodayAnswer todayAnswer = findTodayAnswerById(accusedAnswer.getTodayAnswer().getId());
                            User reportedUser = findUserById(todayAnswer.getUser().getId());
                            return AccusedAnswer.builder()
                                    .accusedAnswerId(accusedAnswer.getId())
                                    .reportedTime(accusedAnswer.getCreatedDate())
                                    .reporterNickname(findUserById(accusedAnswer.getReporterId()).getNickname())
                                    .reportedUserId(reportedUser.getId())
                                    .reportedNickname(reportedUser.getNickname())
                                    .reason(accusedAnswer.getReason())
                                    .answer(todayAnswer.getAnswer())
                                    .isSolved(accusedAnswer.isSolved())
                                    .build();
                        })
                        .collect(Collectors.toList()))
                .build();
    }

    @Transactional
    public Message updateAccusedAnswer(String token, Long answerAccusationId) {
        jwtTokenProvider.findUserByToken(token);
        AnswerAccusation answerAccusation = findAnswerAccusationById(answerAccusationId);
        answerAccusation.updateIsSolved();
        TodayAnswer todayAnswer = answerAccusation.getTodayAnswer();
        todayAnswer.deleteTodayAnswer();
        User reportedUser = findUserById(findTodayAnswerById(todayAnswer.getId()).getUser().getId());
        reportedUser.getBanStatus().updateWarningCount();
        checkWarningCount(reportedUser);
        answerAccusationRepository.save(answerAccusation);
        return new Message(ACCUSED_ANSWER_SOLVED.getMessage());
    }

    public Message deleteAccusedAnswer(String token, Long answerAccusationId) {
        jwtTokenProvider.findUserByToken(token);
        AnswerAccusation answerAccusation = findAnswerAccusationById(answerAccusationId);
        answerAccusation.deleteAnswerAccusation();
        answerAccusationRepository.save(answerAccusation);
        return new Message(ACCUSED_ANSWER_DELETED.getMessage());
    }

    public FindTodayQuestionsResponse findTodayQuestions(String token, String date) {
        jwtTokenProvider.findUserByToken(token);
        return FindTodayQuestionsResponse.builder()
                .questions(todayQuestionRepository.findTodayQuestionsByYearAndMonthAndIsActiveTrue(date)
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

    public Message createTodayQuestion(String token, CreateTodayQuestionRequest createTodayQuestionRequest) {
        jwtTokenProvider.findUserByToken(token);
        todayQuestionRepository.save(TodayQuestion.builder()
                .question(createTodayQuestionRequest.getQuestion())
                .date(createTodayQuestionRequest.getDate())
                .build());
        return new Message(TODAY_QUESTION_CREATED.getMessage());
    }

    public Message updateTodayQuestion(String token, Long questionId, UpdateTodayQuestionRequest updateTodayQuestionRequest) {
        jwtTokenProvider.findUserByToken(token);
        TodayQuestion todayQuestion = findTodayQuestionById(questionId);
        todayQuestion.updateQuestion(updateTodayQuestionRequest.getQuestion());
        todayQuestionRepository.save(todayQuestion);
        return new Message(TODAY_QUESTION_UPDATED.getMessage());
    }

    public Message deleteTodayQuestion(String token, Long questionId) {
        jwtTokenProvider.findUserByToken(token);
        TodayQuestion todayQuestion = findTodayQuestionById(questionId);
        todayQuestion.deleteQuestion();
        todayQuestionRepository.save(todayQuestion);
        return new Message(TODAY_QUESTION_DELETED.getMessage());
    }

    public FindTodayAnswersResponse findTodayAnswers(String token, Long questionId) {
        jwtTokenProvider.findUserByToken(token);
        return FindTodayAnswersResponse.builder()
                .answers(todayAnswerRepository.findAllByTodayQuestionId(questionId)
                        .stream()
                        .map(todayAnswer -> {
                            User user = todayAnswer.getUser();
                            return TodayAnswerItem.builder()
                                    .todayAnswerId(todayAnswer.getId())
                                    .answer(todayAnswer.getAnswer())
                                    .userId(user.getId())
                                    .nickname(user.getNickname())
                                    .build();
                        })
                        .collect(Collectors.toList()))
                .build();
    }

    private void checkWarningCount(User reportedUser) {
        if (reportedUser.getBanStatus().getWarningCount() == MAX_WARNING_COUNT) {
            reportedUser.getBanStatus().updateIsBan();
        }
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

    private LetterAccusation findLetterAccusationById(Long letterAccusationId) {
        return letterAccusationRepository.findById(letterAccusationId)
                .orElseThrow(() -> new NotFoundException(ACCUSED_LETTER_NOT_FOUND));
    }

    private AnswerAccusation findAnswerAccusationById(Long answerAccusationId) {
        return answerAccusationRepository.findById(answerAccusationId)
                .orElseThrow(() -> new NotFoundException(ACCUSED_ANSWER_NOT_FOUNT));
    }

    private TodayQuestion findTodayQuestionById(Long todayQuestionId) {
        return todayQuestionRepository.findById(todayQuestionId)
                .orElseThrow(() -> new NotFoundException(TODAY_QUESTION_NOT_FOUND));
    }

    private TodayAnswer findTodayAnswerById(Long todayAnswerId) {
        return todayAnswerRepository.findById(todayAnswerId)
                .orElseThrow(() -> new NotFoundException(TODAY_ANSWER_NOT_FOUND));
    }
}
