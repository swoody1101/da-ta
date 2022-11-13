package com.da_ta.backend.account.user.domain.repository;

import com.da_ta.backend.account.user.domain.entity.BanStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BanStatusRepository extends JpaRepository<BanStatus, Long> {
}
