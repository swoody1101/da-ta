package com.da_ta.backend.letter.controller.dto.common;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class LetterInfo {

    Long letterId;
    String title;
    String content;
    String imageLetterUrl;
    String backgroundUrl;
    String fontName;
    LocalDateTime writtenDate;
}
