package com.da_ta.backend.account.admin.service;

import com.da_ta.backend.account.admin.controller.dto.FindUsersResponse;
import com.da_ta.backend.account.admin.controller.dto.UpdateRoleRequest;
import com.da_ta.backend.account.admin.controller.dto.UserItem;
import com.da_ta.backend.account.jwt.JwtTokenProvider;
import com.da_ta.backend.account.user.controller.dto.BanStatusInfo;
import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.account.user.domain.repository.UserRepository;
import com.da_ta.backend.common.domain.Message;
import com.da_ta.backend.common.domain.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

import static com.da_ta.backend.common.domain.ErrorCode.USER_NOT_FOUND;
import static com.da_ta.backend.common.domain.SuccessCode.ROLE_UPDATED;

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

    public Message updateRole(String token, Long userId, UpdateRoleRequest updateRoleRequest) {
        jwtTokenProvider.findUserByToken(token);
        User user = findUserById(userId);
        user.updateRole(updateRoleRequest.getRole());
        userRepository.save(user);
        return new Message(ROLE_UPDATED.getMessage());
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
    }
}
