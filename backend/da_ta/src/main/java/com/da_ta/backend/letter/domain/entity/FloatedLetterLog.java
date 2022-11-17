package com.da_ta.backend.letter.domain.entity;

import com.da_ta.backend.common.domain.CommonEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "floated_letter_log_id"))
@Entity
public class FloatedLetterLog extends CommonEntity {

    @NotNull
    private Long loggedRecipientId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "floated_letter_id")
    private FloatedLetter floatedLetter;
}
