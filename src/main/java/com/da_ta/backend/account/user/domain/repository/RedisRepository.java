package com.da_ta.backend.account.user.domain.repository;

import com.da_ta.backend.account.user.controller.dto.TokenInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedisRepository extends CrudRepository<TokenInfo, String> {
}
