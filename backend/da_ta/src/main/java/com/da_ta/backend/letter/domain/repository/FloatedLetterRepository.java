package com.da_ta.backend.letter.domain.repository;

import com.da_ta.backend.letter.domain.entity.FloatedLetter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FloatedLetterRepository extends JpaRepository<FloatedLetter, Long> {

    Optional<FloatedLetter> findByLetterIdAndRecipientId(Long letterId, Long recipientId);

    @Query(value = "select f.* " +
            "from floated_letter f " +
            "left join letter l " +
            "on f.letter_id = l.letter_id " +
            "where f.is_active = true " +
            "and f.recipient_id is null " +
            "and l.writer_id != :recipientId " +
            "and l.age_option like concat('%', :ageOption, '%') " +
            "and f.floated_letter_id " +
            "NOT IN " +
                "(select log.floated_letter_id " +
                "from floated_letter_log log " +
                "where logged_recipient_id = :recipientId) " +
            "order by l.created_date limit 1",
            nativeQuery = true)
    Optional<FloatedLetter> findByRecipientIdAndAgeOption(@Param("recipientId") Long recipientId,
                                                         @Param("ageOption") String ageOption);
}
