package com.da_ta.backend.letter.domain.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class TextLetter extends Letter {

    @NotNull
    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @NotNull
    private Long fontId;
}
