package com.da_ta.backend.letter.controller.dto;

import com.da_ta.backend.letter.controller.dto.common.Option;
import com.da_ta.backend.letter.controller.dto.common.TextLetterInfo;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TextLetterCreateRequest {

    private Long userId;
    private Option option;
    private TextLetterInfo textLetterInfo;
}
