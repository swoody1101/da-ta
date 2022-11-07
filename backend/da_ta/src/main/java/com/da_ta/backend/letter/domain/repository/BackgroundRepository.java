package com.da_ta.backend.letter.domain.repository;

import com.da_ta.backend.letter.domain.entity.Background;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BackgroundRepository extends JpaRepository<Background, Long> {

    Optional<Background> findByBackgroundUrl(String backgroundUrl);
}
