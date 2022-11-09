package com.da_ta.backend.question.domain.repository;

import com.da_ta.backend.question.domain.entity.TodayAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodayAnswerRepository extends JpaRepository<TodayAnswer, Long> {
    @Override
    List<TodayAnswer> findAll();
}
