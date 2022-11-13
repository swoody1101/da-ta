package com.da_ta.backend.letter.domain.entity;

import com.da_ta.backend.account.user.domain.entity.User;
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
@AttributeOverride(name = "id", column = @Column(name = "collectie_letter_id"))
@Entity
public class CollectedLetter extends CommonEntity {

    @NotNull
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "letter_id", unique = true)
    private Letter letter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void deleteCollectedLetter() {
        super.delete();
        this.letter.deleteLetter();
    }
}
