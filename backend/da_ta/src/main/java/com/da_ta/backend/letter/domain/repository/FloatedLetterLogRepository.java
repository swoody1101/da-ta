package com.da_ta.backend.letter.domain.repository;

import com.da_ta.backend.letter.domain.entity.FloatedLetterLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FloatedLetterLogRepository extends JpaRepository<FloatedLetterLog, Long> {

    int countByFloatedLetterId(Long floatedLetterId);
}
