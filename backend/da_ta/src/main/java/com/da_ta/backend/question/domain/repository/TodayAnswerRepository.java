package com.da_ta.backend.question.domain.repository;

import com.da_ta.backend.question.domain.entity.TodayAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TodayAnswerRepository extends JpaRepository<TodayAnswer, Long> {

    List<TodayAnswer> findAllByTodayQuestionId(Long questionId);

    @Query(value = "select t.* " +
            "from today_answer t " +
            "where t.today_answer_id " +
            "not in " +
                "(select a.today_answer_id " +
                "from answer_accusation a " +
                "where a.is_active=true)"
            , nativeQuery = true)
    List<TodayAnswer> findAllUnaccusedAnswers();
}
