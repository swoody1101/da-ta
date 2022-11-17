package com.da_ta.backend.question.service;

import com.da_ta.backend.common.domain.exception.NotFoundException;
import com.da_ta.backend.question.controller.dto.TodayQuestionResponse;
import com.da_ta.backend.question.domain.entity.TodayQuestion;
import com.da_ta.backend.question.domain.repository.TodayQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import static com.da_ta.backend.common.domain.ErrorCode.*;


@RequiredArgsConstructor
@Service
public class TodayQuestionService {

    private final TodayQuestionRepository todayQuestionRepository;

    public TodayQuestionResponse findTodayQuestion() {
        LocalDate nowTime = LocalDate.now();
        TodayQuestion todayQuestion = todayQuestionRepository.findByDateAndIsActiveTrue(nowTime)
                .orElseThrow(() -> new NotFoundException(TODAY_QUESTION_NOT_FOUND));
        return TodayQuestionResponse.builder()
                .todayQuestionId(todayQuestion.getId())
                .question(todayQuestion.getQuestion())
                .date(todayQuestion.getDate().toString())
                .build();
    }
}
