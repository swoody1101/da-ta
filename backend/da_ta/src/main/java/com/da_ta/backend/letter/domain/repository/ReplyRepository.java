package com.da_ta.backend.letter.domain.repository;

import com.da_ta.backend.letter.domain.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
}
