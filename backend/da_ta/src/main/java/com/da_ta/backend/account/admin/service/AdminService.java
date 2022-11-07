package com.da_ta.backend.account.admin.service;

import com.da_ta.backend.account.admin.controller.dto.FindUsersResponse;
import com.da_ta.backend.account.admin.controller.dto.UserItem;
import com.da_ta.backend.account.jwt.JwtTokenProvider;
import com.da_ta.backend.account.user.controller.dto.BanStatusInfo;
import com.da_ta.backend.account.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public FindUsersResponse findUsers(String token) {
        jwtTokenProvider.findUserByToken(token);
        return FindUsersResponse.builder()
                .users(userRepository.findAll()
                        .stream()
                        .map(user -> UserItem.builder()
                                .userId(user.getId())
                                .kakaoId(user.getKakaoId())
                                .nickname(user.getNickname())
                                .ageRange(user.getAge().getAgeRange())
                                .role(user.getRole())
                                .isActive(user.isActive())
                                .banStatus(BanStatusInfo.builder()
                                        .isBan(user.getBanStatus().isBan())
                                        .build())
                                .build()
                        ).collect(Collectors.toList()))
                .build();
    }
}
