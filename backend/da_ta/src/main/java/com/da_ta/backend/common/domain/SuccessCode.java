package com.da_ta.backend.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    REISSUED_TOKEN("토큰이 재발급되었습니다.");

    private final String message;
}
