package com.da_ta.backend.question.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TodayQuestionResponse {

    private Long todayQuestionId;
    private String question;
    private String date;
}
