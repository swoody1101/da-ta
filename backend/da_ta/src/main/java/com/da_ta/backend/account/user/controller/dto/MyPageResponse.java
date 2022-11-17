package com.da_ta.backend.account.user.controller.dto;

import com.da_ta.backend.common.domain.Age;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyPageResponse {

    private Long userId;
    private Age ageRange;
    private Boolean isAlertActive;
}
