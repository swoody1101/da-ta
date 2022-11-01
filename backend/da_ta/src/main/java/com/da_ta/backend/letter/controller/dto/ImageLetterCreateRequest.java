package com.da_ta.backend.letter.controller.dto;

import com.da_ta.backend.letter.controller.dto.common.ImageLetterInfo;
import com.da_ta.backend.letter.controller.dto.common.Option;
import lombok.Getter;

@Getter
public class ImageLetterCreateRequest {

    private Long userId;
    private Option option;
    private ImageLetterInfo imageLetterInfo;
}
