package com.da_ta.backend.account.user.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class NicknameResponse {

    @JsonProperty(value = "words")
    private String[] nickname;
}
