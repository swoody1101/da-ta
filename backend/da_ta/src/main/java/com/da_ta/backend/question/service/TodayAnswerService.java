package com.da_ta.backend.question.service;

import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.common.domain.Message;
import com.da_ta.backend.common.domain.exception.NotFoundException;
import com.da_ta.backend.question.controller.dto.AccuseAnswerRequest;
import com.da_ta.backend.question.controller.dto.CreateTodayAnswerRequest;
import com.da_ta.backend.question.controller.dto.TodayAnswerResponse;
import com.da_ta.backend.question.domain.entity.AnswerAccusation;
import com.da_ta.backend.question.domain.entity.TodayAnswer;
import com.da_ta.backend.question.domain.entity.TodayQuestion;
import com.da_ta.backend.question.domain.repository.AnswerAccusationRepository;
import com.da_ta.backend.question.domain.repository.TodayAnswerRepository;
import com.da_ta.backend.question.domain.repository.TodayQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.da_ta.backend.common.domain.ErrorCode.TODAY_ANSWER_NOT_FOUND;
import static com.da_ta.backend.common.domain.ErrorCode.TODAY_QUESTION_NOT_FOUND;
import static com.da_ta.backend.common.domain.SuccessCode.ANSWER_ACCUSED;
import static com.da_ta.backend.common.domain.SuccessCode.TODAY_ANSWER_CREATED;

@RequiredArgsConstructor
@Service
public class TodayAnswerService {

    private final TodayAnswerRepository todayAnswerRepository;
    private final TodayQuestionRepository todayQuestionRepository;
    private final AnswerAccusationRepository answerAccusationRepository;

    public Message createTodayAnswer(CreateTodayAnswerRequest createTodayAnswerRequest, User user) {
        TodayAnswer todayAnswer = TodayAnswer.builder()
                .answer(createTodayAnswerRequest.getAnswer())
                .user(user)
                .todayQuestion(findTodayQuestionById(createTodayAnswerRequest.getTodayQuestionId()))
                .build();
        todayAnswerRepository.save(todayAnswer);
        return new Message(TODAY_ANSWER_CREATED.getMessage());
    }

    public List<TodayAnswerResponse> findTodayAnswers() {
        return todayAnswerRepository.findAllUnaccusedAnswers()
                .stream()
                .map(todayAnswer -> TodayAnswerResponse.builder()
                        .todayAnswerId(todayAnswer.getId())
                        .answer(todayAnswer.getAnswer())
                        .userId(todayAnswer.getUser().getId())
                        .todayQuestionId(todayAnswer.getTodayQuestion().getId())
                        .build()
                ).collect(Collectors.toList());
    }

    public Message createAnswerAccusation(User reporter, Long todayAnswerId, AccuseAnswerRequest accuseAnswerRequest) {
        answerAccusationRepository.save(AnswerAccusation.builder()
                .todayAnswer(findTodayAnswerById(todayAnswerId))
                .reporterId(reporter.getId())
                .reason(accuseAnswerRequest.getReason())
                .build());
        return new Message(ANSWER_ACCUSED.getMessage());
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
