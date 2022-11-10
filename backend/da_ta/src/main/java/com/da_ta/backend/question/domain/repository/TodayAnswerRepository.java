package com.da_ta.backend.question.domain.repository;

import com.da_ta.backend.question.domain.entity.TodayAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodayAnswerRepository extends JpaRepository<TodayAnswer, Long> {
}
