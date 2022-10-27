package com.da_ta.backend.letter.domain.entity;

import com.da_ta.backend.common.domain.CommonEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name ="id", column = @Column(name="letter_id"))
@Entity
public class Letter extends CommonEntity {

    @NotNull
    private boolean replyOption;

    @NotNull
    private String ageOption;

    @NotNull
    private String title;

    @ManyToOne
    @JoinColumn(name="background_id")
    private Background background;

    @NotNull
    private LetterType letterType;
}
