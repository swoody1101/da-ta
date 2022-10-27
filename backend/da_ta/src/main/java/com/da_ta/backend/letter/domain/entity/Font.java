package com.da_ta.backend.letter.domain.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Font {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fontId;

    @NotNull
    private String fontName;
}
