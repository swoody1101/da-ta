package com.da_ta.backend.common.domain.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    BACKGROUND_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 편지지입니다."),
    FONT_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 폰트입니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 유저id입니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL SERVER ERROR");

    private final HttpStatus httpStatus;
    private final String message;
}
