package com.da_ta.backend.letter.domain.repository;

import com.da_ta.backend.letter.domain.entity.Letter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LetterRepository extends JpaRepository<Letter, Long> {
}
