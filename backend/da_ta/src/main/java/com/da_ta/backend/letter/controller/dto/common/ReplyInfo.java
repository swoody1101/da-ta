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
    private String backgroundUrl;
    private String fontName;
    private LocalDateTime writtenDate;
}
