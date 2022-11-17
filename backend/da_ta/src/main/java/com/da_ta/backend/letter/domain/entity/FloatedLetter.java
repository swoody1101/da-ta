package com.da_ta.backend.letter.domain.entity;

import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.common.domain.CommonEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "floated_letter_id"))
@Entity
public class FloatedLetter extends CommonEntity {

    @NotNull
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "letter_id", unique = true)
    private Letter letter;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient_id", unique = true)
    private User recipient;

    @OneToMany(mappedBy = "floatedLetter", cascade = CascadeType.ALL)
    private List<FloatedLetterLog> logs = new ArrayList<>();

    public void updateRecipient(User recipient) {
        this.recipient = recipient;
    }

    public void deleteFloatedLetter() {
        super.delete();
        letter.deleteLetter();
    }

    public void updateFloatedLetter() {
        super.delete();
        this.recipient = null;
    }
}
