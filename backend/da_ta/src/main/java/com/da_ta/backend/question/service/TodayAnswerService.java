package com.da_ta.backend.question.service;

import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.common.domain.Message;
import com.da_ta.backend.question.controller.dto.TodayAnswerCreateRequest;
import com.da_ta.backend.question.controller.dto.TodayAnswerResponse;
import com.da_ta.backend.question.domain.entity.TodayAnswer;
import com.da_ta.backend.question.domain.repository.TodayAnswerRepository;
import com.da_ta.backend.question.domain.repository.TodayQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.da_ta.backend.common.domain.SuccessCode.*;

@RequiredArgsConstructor
@Service
public class TodayAnswerService {

    private final TodayAnswerRepository todayAnswerRepository;

    private final TodayQuestionRepository todayQuestionRepository;

    public Message createTodayQuestion(TodayAnswerCreateRequest todayAnswerCreateRequest, User user) {
        TodayAnswer todayAnswer = TodayAnswer.builder()
                .answer(todayAnswerCreateRequest.getAnswer())
                .user(user)
                .todayQuestion(todayQuestionRepository.findById(todayAnswerCreateRequest.getTodayQuestionId()).get())
                .build();
        todayAnswerRepository.save(todayAnswer);
        return new Message(TODAY_ANSWER_CREATED.getMessage());
    }

    public List<TodayAnswerResponse> findTodayAnswer() {
        return todayAnswerRepository.findAll()
                .stream()
                .map(m -> new TodayAnswerResponse(m.getId(),m.getAnswer(),m.getUser().getId(),m.getTodayQuestion().getId()))
                .collect(Collectors.toList());
    }
}