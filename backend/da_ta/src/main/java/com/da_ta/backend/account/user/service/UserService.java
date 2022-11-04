package com.da_ta.backend.account.user.service;

import com.da_ta.backend.account.jwt.JwtTokenProvider;
import com.da_ta.backend.account.user.domain.repository.BanStatusRepository;
import com.da_ta.backend.account.user.domain.repository.RedisRepository;
import com.da_ta.backend.account.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final String GENERATE_NICKNAME_URL = "https://nickname.hwanmoo.kr/?format=json&count=1";
    private final String CONTENT_TYPE = "Content-type";
    private final String CONTENT_TYPE_VALUE = "application/x-www-form-urlencoded;charset=utf-8";
    private final String GRANT_TYPE_VALUE = "authorization_code";
    private final String TOKEN_SUBJECT = "sub";
    private final String DELIMITER = " ";
    private final UserRepository userRepository;
    private final BanStatusRepository banStatusRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisRepository redisRepository;

    @Value("${kakao.client-id}")
    private String clientId;

    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    @Value("${kakao.client-secret}")
    private String clientSecret;

    @Value("${provider.kakao.token-uri}")
    private String tokenUri;

    @Value("${provider.kakao.user-info-uri}")
    private String userInfoUri;

    @Value("${spring.jwt.response.header}")
    private String jwtHeader;

    @Value("${spring.jwt.token.prefix}")
    private String jwtTokenPrefix;

    public LoginResponse login(LoginRequest loginRequest, HttpHeaders headers) {
        KakaoToken kakaoToken = getKakaoAccessToken(loginRequest.getAuthorizationCode());
        User user = getUser(kakaoToken.getAccessToken());
        TokenInfo accessToken = jwtTokenProvider.createAccessToken(user);
        TokenInfo refreshToken = jwtTokenProvider.createRefreshToken(user);
        jwtTokenProvider.setHeaderAccessToken(headers, accessToken.getValue());
        redisRepository.save(refreshToken);
        return LoginResponse.builder()
                .userId(user.getId())
                .nickname(user.getNickname())
                .banStatus(BanStatusInfo.builder()
                        .isBan(user.getBanStatus().isBan())
                        .build())
                .role(user.getRole())
                .build();
    }
}
