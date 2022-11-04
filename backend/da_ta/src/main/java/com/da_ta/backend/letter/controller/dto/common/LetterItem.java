package com.da_ta.backend.letter.controller.dto.common;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class LetterItem {

    private Long letterId;
    private String letterTitle;
    private Long writerId;
    private Long writerNickname;
    private LocalDateTime createdTime;
}
