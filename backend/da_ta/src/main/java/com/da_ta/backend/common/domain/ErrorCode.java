package com.da_ta.backend.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    USER_NOT_FOUND("존재하지 않는 사용자입니다."),

    UNAUTHORIZED("권한이 없습니다."),
    WRONG_TOKEN("유효하지 않은 토큰 값입니다."),
    WRONG_AUTHENTICATION_TYPE("잘못된 인증 타입입니다."),
    ACCESS_TOKEN_EXPIRED("만료된 Access Token 입니다."),
    REFRESH_TOKEN_EXPIRED("만료된 Refresh Token 입니다.");

    private final String message;
}

