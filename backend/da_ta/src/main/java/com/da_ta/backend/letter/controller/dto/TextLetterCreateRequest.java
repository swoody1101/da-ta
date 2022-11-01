package com.da_ta.backend.letter.controller.dto;

import com.da_ta.backend.letter.controller.dto.common.Option;
import com.da_ta.backend.letter.controller.dto.common.TextLetterInfo;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;

@Getter
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class TextLetterCreateRequest {

    private Long userId;
    private Option option;
    private TextLetterInfo textLetterInfo;
}
