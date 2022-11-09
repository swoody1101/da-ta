package com.da_ta.backend.question.controller.dto;

import lombok.*;

@Getter
@Builder
public class TodayAnswerCreateRequest {

    private String answer;
    private Long todayQuestionId;
}
