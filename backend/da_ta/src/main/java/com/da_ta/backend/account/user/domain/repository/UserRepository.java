package com.da_ta.backend.account.user.domain.repository;

import com.da_ta.backend.account.user.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByKakaoId(String kakaoId);

    boolean existsByNickname(String randomNickname);
}
