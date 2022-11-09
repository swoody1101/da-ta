package com.da_ta.backend.letter.controller.dto;

import lombok.Getter;

@Getter
public class AccuseLetterRequest {

    private Boolean isReply;
    private String reason;
}
