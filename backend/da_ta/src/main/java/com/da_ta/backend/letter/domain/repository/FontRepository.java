package com.da_ta.backend.letter.domain.repository;

import com.da_ta.backend.letter.domain.entity.Font;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FontRepository extends JpaRepository<Font, Long> {

    Optional<Font> findByFontName(String fontName);
}
