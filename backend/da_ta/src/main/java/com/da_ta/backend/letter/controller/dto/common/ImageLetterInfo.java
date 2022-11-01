package com.da_ta.backend.letter.controller.dto.common;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;

@Getter
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ImageLetterInfo {

    private String title;
    private String imageLetterUrl;
    private Long backgroundId;
}