package com.da_ta.backend.account.admin.controller.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccusedLetter {

    private Long accusedLetterId;
    private LocalDateTime reportedTime;
    private String reporterNickname;
    private Long reportedUserId;
    private String reportedNickname;
    private String reason;
    private String content;
}
