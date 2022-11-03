package com.da_ta.backend.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    FLOATED_LETTER_NO_CONTENT("편지를 바다에 다시 띄웠습니다."),
    IMAGE_LETTER_CREATED("이미지 편지를 바다에 띄웠습니다."),
    TEXT_LETTER_CREATED("텍스트 편지를 바다에 띄웠습니다.");

    private final String message;
}
