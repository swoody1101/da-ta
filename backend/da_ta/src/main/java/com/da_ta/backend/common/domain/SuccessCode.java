package com.da_ta.backend.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    IMAGE_LETTER_CREATED("이미지 편지가 성공적으로 생성되었습니다."),
    TEXT_LETTER_CREATED("텍스트 편지가 성공적으로 생성되었습니다.");

    private final String message;
}
