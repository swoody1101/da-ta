package com.da_ta.backend.letter.domain.entity;

public enum LetterType {

    TEXT("텍스트 편지"),

    IMAGE("이미지 편지");

    private String value;

    LetterType(String value) {
        this.value = value;
    }
}
