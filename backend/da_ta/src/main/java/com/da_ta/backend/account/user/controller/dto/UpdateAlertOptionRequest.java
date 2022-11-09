package com.da_ta.backend.account.user.controller.dto;

import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UpdateAlertOptionRequest {

    private Boolean isAlertActive;
}
