package com.da_ta.backend.question.controller.dto;

import lombok.*;

import java.util.Date;

@Getter
@Builder
public class TodayQuestionResponse {

    private Long todayQuestionId;
    private String question;
    private String date;
}
