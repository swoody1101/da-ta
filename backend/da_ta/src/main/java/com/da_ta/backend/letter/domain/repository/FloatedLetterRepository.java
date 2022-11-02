package com.da_ta.backend.letter.domain.repository;

import com.da_ta.backend.common.domain.Age;
import com.da_ta.backend.letter.domain.entity.FloatedLetter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FloatedLetterRepository extends JpaRepository<FloatedLetter, Long> {

    @Query(value = "select f.floated_letter_id, f.letter_id, f.recipient_id " +
            "from floated_letter f " +
            "join letter l " +
            "using(letter_id) " +
            "where f.is_active = true " +
            "and f.recipient_id is null " +
            "and l.writer_id != :recipientId " +
            "and l.age_option = :ageOption " +
            "and f.floated_letter_id " +
            "NOT IN " +
            "(select floated_letter_id " +
            "from floated_letter_log " +
            "where logged_recipient_id = :recipientId)" +
            "order by l.created_date limit 1;",
            nativeQuery = true)
    Optional<FloatedLetter> findFloatedLetterByAgeOption(Long recipientId, Age ageOption);
}
