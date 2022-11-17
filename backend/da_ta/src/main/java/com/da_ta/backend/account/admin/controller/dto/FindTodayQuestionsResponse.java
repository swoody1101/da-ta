package com.da_ta.backend.account.admin.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FindTodayQuestionsResponse {

    private List<TodayQuestionItem> questions;
}
