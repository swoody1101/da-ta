package com.da_ta.backend.question.controller.dto;

import lombok.*;

@Getter
public class CreateTodayAnswerRequest {

    private String answer;
    private Long todayQuestionId;
}
