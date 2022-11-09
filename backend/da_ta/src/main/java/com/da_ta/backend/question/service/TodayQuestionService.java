package com.da_ta.backend.question.service;

import com.da_ta.backend.common.domain.exception.NotFoundException;
import com.da_ta.backend.question.controller.dto.TodayQuestionResponse;
import com.da_ta.backend.question.domain.entity.TodayQuestion;
import com.da_ta.backend.question.domain.repository.TodayQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

import static com.da_ta.backend.common.domain.ErrorCode.*;


@RequiredArgsConstructor
@Service
public class TodayQuestionService {

    private final TodayQuestionRepository todayQuestionRepository;

    public TodayQuestionResponse findTodayQuestion() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date now = new Date();
        String nowTime = simpleDateFormat.format(now);
        TodayQuestion todayQuestion = todayQuestionRepository.findByDate(nowTime)
                .orElseThrow(() -> new NotFoundException(TODAY_QUESTION_NOT_FOUND));
        return TodayQuestionResponse.builder()
                .todayQuestionId(todayQuestion.getId())
                .question(todayQuestion.getQuestion())
                .date(todayQuestion.getDate())
                .build();
    }
}
