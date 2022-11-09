package com.da_ta.backend.question.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
public class TodayAnswerResponse {

    private Long todayAnswerId;
    private String answer;
    private Long userId;
    private Long todayQuestionId;
}
