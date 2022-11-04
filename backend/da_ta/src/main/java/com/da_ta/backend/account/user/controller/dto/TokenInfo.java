package com.da_ta.backend.account.user.controller.dto;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@Builder
@RedisHash("auth")
@NoArgsConstructor
@AllArgsConstructor
public class TokenInfo {

    @Id
    @Indexed
    private Long key;

    private String value;

    @TimeToLive
    private Long expiredTime;
}