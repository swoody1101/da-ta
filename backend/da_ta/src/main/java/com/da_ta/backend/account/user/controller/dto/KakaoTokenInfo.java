package com.da_ta.backend.account.user.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class KakaoTokenInfo {

    private Long id;
    private int expires_in;
    private int app_id;
    private int appId;
    private Long expiresInMillis;
}
