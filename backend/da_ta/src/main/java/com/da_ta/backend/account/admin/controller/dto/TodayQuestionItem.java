package com.da_ta.backend.account.admin.controller.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodayQuestionItem {

    private Long todayQuestionId;
    private String question;
    private LocalDate date;
}
