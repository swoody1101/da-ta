package com.da_ta.backend.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    REISSUED_TOKEN("토큰이 재발급되었습니다.");

    COLLECTED_LETTER_CREATED("편지를 주웠습니다."),
    IMAGE_LETTER_CREATED("이미지 편지를 바다에 띄웠습니다."),
    LETTER_ACCUSATION_CREATED("편지 신고가 완료되었습니다."),
    REPLY_CREATED("답장을 발송하였습니다."),
    TEXT_LETTER_CREATED("텍스트 편지를 바다에 띄웠습니다."),
    FLOATED_LETTER_NO_CONTENT("편지를 바다에 다시 띄웠습니다."),
    REPLY_RECEPTION_CHECK_NO_CONTENT("답장 읽음 처리에 성공하였습니다.");

    private final String message;
}
