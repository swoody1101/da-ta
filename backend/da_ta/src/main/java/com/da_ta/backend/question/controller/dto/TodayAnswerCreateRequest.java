package com.da_ta.backend.question.controller.dto;

import lombok.*;

@Getter
public class TodayAnswerCreateRequest {

    private String answer;
    private Long todayQuestionId;
}
