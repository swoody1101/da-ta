package com.da_ta.backend.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    ACCUSED_ANSWER_DELETED("답변 신고가 반려되었습니다."),
    ACCUSED_ANSWER_SOLVED("답변 신고 처리가 완료되었습니다."),
    ACCUSED_LETTER_DELETED("편지 신고가 반려되었습니다."),
    ACCUSED_LETTER_SOLVED("편지 신고 처리가 완료되었습니다."),
    AGE_RANGE_UPDATED("연령대 수정이 완료되었습니다."),
    ALERT_OPTION_UPDATED("알림 활성 여부 수정이 완료되었습니다."),
    LOGOUT("로그아웃 되었습니다."),
    TOKEN_REISSUED("토큰이 재발급되었습니다."),
    USER_DELETED("회원 탈퇴가 완료되었습니다."),
    ROLE_UPDATED("회원 권한 수정이 완료되었습니다."),
    WARNING_COUNT_UPDATED("회원 신고 처리가 완료되었습니다."),

    COLLECTED_LETTER_DELETED("편지가 보관함에서 삭제되었습니다."),
    IMAGE_LETTER_FLOATED("이미지 편지를 바다에 띄웠습니다."),
    LETTER_ACCUSED("편지 신고가 완료되었습니다."),
    LETTER_COLLECTED("편지를 주웠습니다."),
    LETTER_REFLOATED("편지를 바다에 다시 띄웠습니다."),
    REPLY_DELETED("답장 받은 편지가 삭제되었습니다."),
    REPLY_RECEPTION_CHECKED("답장 읽음 처리에 성공하였습니다."),
    REPLY_SENT("답장을 발송하였습니다."),
    TEXT_LETTER_FLOATED("텍스트 편지를 바다에 띄웠습니다."),

    ANSWER_ACCUSED("답변 신고가 완료되었습니다."),
    TODAY_ANSWER_CREATED("답변을 성공적으로 작성하였습니다."),
    TODAY_QUESTION_CREATED("오늘의 질문 등록이 완료되었습니다."),
    TODAY_QUESTION_UPDATED("오늘의 질문 수정이 완료되었습니다."),
    TODAY_QUESTION_DELETED("오늘의 질문이 삭제되었습니다.");

    private final String message;
}
