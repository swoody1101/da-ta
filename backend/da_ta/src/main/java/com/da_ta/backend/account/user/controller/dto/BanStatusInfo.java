package com.da_ta.backend.account.user.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BanStatusInfo {

    private Boolean isBan;
}
