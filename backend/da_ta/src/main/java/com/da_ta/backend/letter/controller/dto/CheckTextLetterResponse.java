package com.da_ta.backend.letter.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CheckTextLetterResponse {

    private Boolean isHarmful;
}
