package com.da_ta.backend.account.user.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {

    ROLE_USER("일반 사용자"),
    ROLE_ADMIN("관리자");

    private final String description;
}
