package com.da_ta.backend.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    BACKGROUND_NOT_FOUND("존재하지 않는 편지지입니다."),
    FONT_NOT_FOUND("존재하지 않는 폰트입니다."),
    USER_NOT_FOUND("존재하지 않는 사용자입니다."),
    INTERNAL_SERVER_ERROR("INTERNAL SERVER ERROR");

    private final String message;
}
