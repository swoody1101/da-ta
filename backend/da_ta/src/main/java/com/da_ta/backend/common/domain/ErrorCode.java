package com.da_ta.backend.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    BACKGROUND_NOT_FOUND("편지지를 찾을 수 없습니다."),
    FONT_NOT_FOUND("폰트를 찾을 수 없습니다."),
    LETTER_NOT_FOUND("편지를 찾을 수 없습니다."),
    USER_NOT_FOUND("사용자를 찾을 수 없습니다.");

    private final String message;
}
