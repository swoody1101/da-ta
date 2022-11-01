package com.da_ta.backend.letter.controller.dto.common;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;

@Getter
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class TextLetterInfo {

    private String title;
    private String content;
    private Long backgroundId;
    private Long fontId;
}
