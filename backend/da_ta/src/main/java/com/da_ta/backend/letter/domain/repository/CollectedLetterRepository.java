package com.da_ta.backend.letter.domain.repository;

import com.da_ta.backend.letter.domain.entity.CollectedLetter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollectedLetterRepository extends JpaRepository<CollectedLetter, Long> {
}
