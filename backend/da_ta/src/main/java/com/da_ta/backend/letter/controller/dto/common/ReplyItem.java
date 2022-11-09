package com.da_ta.backend.letter.controller.dto.common;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReplyItem {

    private Long writerId;
    private String writerNickname;
    private Long id;
    private String title;
    private LocalDateTime writtenDate;
    private boolean isRead;
}
