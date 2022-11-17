package com.da_ta.backend.letter.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CheckTextHarmfulnessResponse {

    private Boolean isHarmful;
}
