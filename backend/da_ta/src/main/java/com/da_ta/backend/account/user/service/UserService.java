package com.da_ta.backend.account.user.service;

import com.da_ta.backend.account.jwt.JwtTokenProvider;
import com.da_ta.backend.account.user.controller.dto.*;
import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.account.user.domain.repository.BanStatusRepository;
import com.da_ta.backend.account.user.domain.repository.RedisRepository;
import com.da_ta.backend.account.user.domain.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

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

    public KakaoToken getKakaoAccessToken(String authorizationCode) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> multiValueMap = new LinkedMultiValueMap<>();
        multiValueMap.add("grant_type", GRANT_TYPE_VALUE);
        multiValueMap.add("client_id", clientId);
        multiValueMap.add("redirect_uri", redirectUri);
        multiValueMap.add("code", authorizationCode);
        multiValueMap.add("client_secret", clientSecret);
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(multiValueMap, httpHeaders);
        ResponseEntity<String> accessTokenResponse = restTemplate.exchange(
                tokenUri,
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoToken kakaoToken = null;
        try {
            kakaoToken = objectMapper.readValue(accessTokenResponse.getBody(), KakaoToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return kakaoToken;
    }

    private KakaoProfile getKakaoProfile(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(jwtHeader, jwtTokenPrefix + DELIMITER + accessToken);
        httpHeaders.add(CONTENT_TYPE, CONTENT_TYPE_VALUE);
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(httpHeaders);
        ResponseEntity<String> kakaoProfileResponse = restTemplate.exchange(
                userInfoUri,
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try {
            kakaoProfile = objectMapper.readValue(kakaoProfileResponse.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return kakaoProfile;
    }

    public User getUser(String accessToken) {
        KakaoProfile kakaoProfile = getKakaoProfile(accessToken);
        User user = userRepository.findByKakaoId(kakaoProfile.getKakaoAccount().getEmail())
                .orElse(signUp(kakaoProfile));
        return user;
    }
}
