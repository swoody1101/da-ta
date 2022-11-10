package com.da_ta.backend.letter.domain.entity;

import com.da_ta.backend.common.domain.CommonEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "letter_accusation_id"))
@Entity
public class LetterAccusation extends CommonEntity {

    @NotNull
    private Long reporterId;

    @NotNull
    private String reason;

    @NotNull
    @Builder.Default
    private boolean isSolved = false;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "letter_id")
    private Letter letter;

    public void updateIsSolved() {
        this.isSolved = true;
    }
}
