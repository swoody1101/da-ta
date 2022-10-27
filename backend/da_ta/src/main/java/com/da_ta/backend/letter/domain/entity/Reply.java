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
@AttributeOverride(name = "id", column = @Column(name = "reply_id"))
@Entity
public class Reply extends CommonEntity {

    @NotNull
    private Long originLetterId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reply_letter_id")
    private Letter letter;

    private boolean isRead;
}
