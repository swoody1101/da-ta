package com.da_ta.backend.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    BACKGROUND_NOT_FOUND("편지지를 찾을 수 없습니다."),
    FLOATED_LETTER_NOT_FOUND("바다에 띄워진 편지를 찾을 수 없습니다."),
    FONT_NOT_FOUND("폰트를 찾을 수 없습니다."),
    IMAGE_LETTER_NOT_FOUND("이미지 편지를 찾을 수 없습니다."),
    LETTER_NOT_FOUND("편지를 찾을 수 없습니다."),
    LETTER_TYPE_NOT_FOUND("존재하지 않는 편지 타입입니다."),
    REPLY_NOT_FOUND("답장을 찾을 수 없습니다."),
    TEXT_LETTER_NOT_FOUND("텍스트 편지를 찾을 수 없습니다."),
    USER_NOT_FOUND("사용자를 찾을 수 없습니다.");

    private final String message;
}
