package com.da_ta.backend.question.domain.repository;

import com.da_ta.backend.question.domain.entity.TodayQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface TodayQuestionRepository extends JpaRepository<TodayQuestion, Long> {

    Optional<TodayQuestion> findByDate(LocalDate date);
}
