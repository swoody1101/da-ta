package com.da_ta.backend.letter.controller.dto.common;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReplyInfo {

    private Long writerId;
    private String writerNickname;
    private String title;
    private String content;
    private Long backgroundId;
    private Long fontId;
    private LocalDateTime writtenDate;
}
