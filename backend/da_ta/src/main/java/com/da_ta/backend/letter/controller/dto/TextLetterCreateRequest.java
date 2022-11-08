package com.da_ta.backend.letter.controller.dto;

import com.da_ta.backend.letter.controller.dto.common.Option;
import com.da_ta.backend.letter.controller.dto.common.TextLetterInfo;
import lombok.Getter;

@Getter
public class TextLetterCreateRequest {

    private Option option;
    private TextLetterInfo textLetterInfo;
}
