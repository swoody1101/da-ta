package com.da_ta.backend.account.jwt;

import com.da_ta.backend.account.user.domain.repository.UserRepository;
import com.da_ta.backend.common.domain.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import static com.da_ta.backend.common.domain.ErrorCode.USER_NOT_FOUND;

@Slf4j
@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) {
        return userRepository.findById(Long.parseLong(userId))
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
    }
}
