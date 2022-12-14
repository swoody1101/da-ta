package com.da_ta.backend.letter.controller.dto;

import com.da_ta.backend.letter.controller.dto.common.LetterInfo;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReceiveFloatedLetterResponse {

    private Long writerId;
    private String writerNickname;
    private boolean replyOption;
    private LetterInfo letterInfo;
}
