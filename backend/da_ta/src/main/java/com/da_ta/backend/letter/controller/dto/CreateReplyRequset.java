package com.da_ta.backend.letter.controller.dto;

import com.da_ta.backend.letter.controller.dto.common.TextLetterInfo;
import lombok.Getter;

@Getter
public class CreateReplyRequset {

    private Long recipientId;
    private TextLetterInfo textLetterInfo;
}
