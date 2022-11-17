package com.da_ta.backend.account.admin.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodayAnswerItem {

    private Long todayAnswerId;
    private String answer;
    private Long userId;
    private String nickname;
}
