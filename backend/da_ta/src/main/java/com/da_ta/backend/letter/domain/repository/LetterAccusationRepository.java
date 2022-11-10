package com.da_ta.backend.letter.domain.repository;

import com.da_ta.backend.letter.domain.entity.LetterAccusation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LetterAccusationRepository extends JpaRepository<LetterAccusation, Long> {
}
