package com.da_ta.backend.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    ACCESS_TOKEN_EXPIRED("만료된 Access Token 입니다."),
    KAKAO_TOKEN_NOT_FOUND("kakao Token을 찾을 수 없습니다."),
    KAKAO_USER_ID_NOT_FOUND("kakao User Id를 찾을 수 없습니다."),
    NICKNAME_NOT_FOUND("닉네임을 찾을 수 없습니다."),
    REFRESH_TOKEN_EXPIRED("만료된 Refresh Token 입니다."),
    UNAUTHORIZED("권한이 없습니다."),
    USER_NOT_FOUND("사용자를 찾을 수 없습니다."),
    WRONG_TOKEN("유효하지 않은 토큰 값입니다."),
    WRONG_AUTHENTICATION_TYPE("잘못된 인증 타입입니다."),

    BAD_WORDS_DUMMY_NOT_FOUND("나쁜 말 더미를 찾을 수 없습니다."),
    COLLECT_LETTER_REJECTED("편지를 수집할 수 없습니다."),
    COLLECTED_LETTER_NOT_FOUND("수집한 편지를 찾을 수 없습니다."),
    FLOATED_LETTER_NOT_FOUND("바다에 띄워진 편지를 찾을 수 없습니다."),
    IMAGE_LETTER_CHECK_FAILED("이미지 편지 검사에 실패하였습니다."),
    IMAGE_LETTER_NOT_FOUND("이미지 편지를 찾을 수 없습니다."),
    LETTER_NOT_FOUND("편지를 찾을 수 없습니다."),
    LETTER_TYPE_NOT_FOUND("존재하지 않는 편지 타입입니다."),
    REPLY_NOT_FOUND("답장을 찾을 수 없습니다."),
    TEXT_LETTER_NOT_FOUND("텍스트 편지를 찾을 수 없습니다."),

    ACCUSED_ANSWER_NOT_FOUNT("신고된 답변을 찾을 수 없습니다."),
    ACCUSED_LETTER_NOT_FOUND("신고된 편지를 찾을 수 없습니다."),
    TODAY_ANSWER_NOT_FOUND("오늘의 답변을 찾을 수 없습니다."),
    TODAY_QUESTION_NOT_FOUND("오늘의 질문을 찾을 수 없습니다.");

    private final String message;
}
