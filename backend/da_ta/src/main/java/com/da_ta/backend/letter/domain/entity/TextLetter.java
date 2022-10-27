package com.da_ta.backend.letter.domain.entity;

import com.da_ta.backend.common.domain.CommonEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name ="id", column = @Column(name="text_letter_id"))
@Entity
public class TextLetter extends CommonEntity {

    @NotNull
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "font_id")
    private Font font;
}
