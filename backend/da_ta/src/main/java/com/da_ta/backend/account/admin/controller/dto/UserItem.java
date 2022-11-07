package com.da_ta.backend.account.admin.controller.dto;

import com.da_ta.backend.account.user.controller.dto.BanStatusInfo;
import com.da_ta.backend.account.user.domain.Role;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserItem {

    private Long userId;
    private String kakaoId;
    private String nickname;
    private String ageRange;
    private Role role;
    private boolean isActive;
    private BanStatusInfo banStatus;
}
