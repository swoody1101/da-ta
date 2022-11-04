package com.da_ta.backend.account.user.domain.repository;

import com.da_ta.backend.account.user.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByKakaoId(String kakaoId);

    boolean existsByNickname(String randomNickname);
}
