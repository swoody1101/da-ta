package com.da_ta.backend.letter.domain.repository;

import com.da_ta.backend.letter.domain.entity.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CollectionRepository extends JpaRepository<Collection, Long> {

    Optional<Collection> findByCollectedLetterIdAndUserId(Long collectedLetterId, Long userId);

    List<Collection> findAllByUserIdAndIsActiveTrueOrderByCreatedDateDesc(Long userId);
}
