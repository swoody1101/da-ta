package com.da_ta.backend.question.domain.repository;

import com.da_ta.backend.question.domain.entity.TodayQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TodayQuestionRepository extends JpaRepository<TodayQuestion, Long> {

    Optional<TodayQuestion> findByDateAndIsActiveTrue(LocalDate date);

    @Query(value = "select * " +
            "from today_question " +
            "where date_format(date, '%Y-%m') = :date " +
            "and is_active = true ", nativeQuery = true)
    List<TodayQuestion> findTodayQuestionsByYearAndMonthAndIsActiveTrue(@Param("date") String date);
}
