package com.da_ta.backend.account.admin.controller.dto;

import com.da_ta.backend.account.user.controller.dto.BanStatusInfo;
import com.da_ta.backend.account.user.domain.Role;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserItem {

    private Long userId;
    private Long kakaoUserId;
    private String nickname;
    private String ageRange;
    private Role role;
    private Boolean isActive;
    private BanStatusInfo banStatus;
}
