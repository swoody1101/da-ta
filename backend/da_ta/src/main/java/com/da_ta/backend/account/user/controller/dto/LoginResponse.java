package com.da_ta.backend.account.user.controller.dto;

import com.da_ta.backend.account.user.domain.Role;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginResponse {

    private Long userId;
    private String nickname;
    private Role role;
    private BanStatusInfo banStatus;
}