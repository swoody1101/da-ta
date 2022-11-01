package com.da_ta.backend.letter.domain.repository;

import com.da_ta.backend.letter.domain.entity.FloatedLetter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FloatedLetterRepository extends JpaRepository<FloatedLetter, Long> {
}
