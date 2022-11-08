package com.da_ta.backend.letter.domain.entity;

import com.da_ta.backend.account.user.domain.entity.User;
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
@AttributeOverride(name = "id", column = @Column(name = "reply_id"))
@Entity
public class Reply extends CommonEntity {

    @NotNull
    private Long originLetterId;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "reply_letter_id", unique = true)
    private Letter repliedLetter;

    @Builder.Default
    private boolean isRead = false;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient_id")
    private User recipient;

    public void updateIsRead() {
        this.isRead = true;
    }

    public void deleteReplyLetter() {
        super.delete();
        this.repliedLetter.deleteLetter();
    }
}
