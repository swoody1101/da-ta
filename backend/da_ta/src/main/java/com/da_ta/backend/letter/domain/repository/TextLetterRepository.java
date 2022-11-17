package com.da_ta.backend.letter.domain.repository;

import com.da_ta.backend.letter.domain.entity.TextLetter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TextLetterRepository extends JpaRepository<TextLetter, Long> {
}
