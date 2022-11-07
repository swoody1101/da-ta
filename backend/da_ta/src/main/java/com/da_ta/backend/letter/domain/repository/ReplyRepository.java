package com.da_ta.backend.letter.domain.repository;

import com.da_ta.backend.letter.domain.entity.CollectedLetter;
import com.da_ta.backend.letter.domain.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    boolean existsByIsReadTrueAndIsActiveTrueAndRecipientId(Long RecipientId);

    List<Reply> findAllByRecipientIdAndIsActiveTrueOrderByCreatedDateDesc(Long recipient_id);

    Optional<Reply> findByReplyLetterId(Long replyLetterId);
}
