package com.da_ta.backend.user.domain;

import lombok.Getter;

@Getter
public enum Role {

    ROLE_ADMIN("관리자"), ROLE_MEMBER("일반회원");

    private String value;

    Role(String value) {
        this.value = value;
    }
}
