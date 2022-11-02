package com.da_ta.backend.letter.controller.dto.common;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class LetterInfo {

    String title;
    String content;
    String imageLetterUrl;
    Long backgroundId;
    Long fontId;
    LocalDateTime createTime;

    @Builder
    public LetterInfo(String title, String content, String imageLetterUrl, Long backgroundId,
                      Long fontId, LocalDateTime createTime) {
        this.title = title;
        this.content = content;
        this.imageLetterUrl = imageLetterUrl;
        this.backgroundId = backgroundId;
        this.fontId = fontId;
        this.createTime = createTime;
    }
}
