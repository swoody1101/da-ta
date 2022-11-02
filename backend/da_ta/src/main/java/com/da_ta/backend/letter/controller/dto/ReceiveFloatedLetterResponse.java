package com.da_ta.backend.letter.controller.dto;

import com.da_ta.backend.letter.controller.dto.common.LetterInfo;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ReceiveFloatedLetterResponse {

    private Long writerId;
    private String writerNickname;
    private LetterInfo letterInfo;

    @Builder
    public ReceiveFloatedLetterResponse(Long writerId, String writerNickname, LetterInfo letterInfo) {
        this.writerId = writerId;
        this.writerNickname = writerNickname;
        this.letterInfo = letterInfo;
    }
}
