package com.da_ta.backend.letter.controller.dto;

import com.da_ta.backend.letter.controller.dto.common.ImageLetterInfo;
import com.da_ta.backend.letter.controller.dto.common.Option;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;

@Getter
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ImageLetterCreateRequest {

    private Long userId;
    private Option option;
    private ImageLetterInfo imageLetterInfo;
}
