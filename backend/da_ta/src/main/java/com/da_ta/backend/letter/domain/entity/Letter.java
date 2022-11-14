package com.da_ta.backend.letter.domain.entity;

import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.common.domain.Age;
import com.da_ta.backend.common.domain.CommonEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "letter_id"))
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Letter extends CommonEntity {

    @NotNull
    private boolean replyOption;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Age ageOption = Age.AGE_ALL;

    @NotNull
    private String title;

    @NotNull
    private Long backgroundId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    private User writer;

    @Column(name = "letter_type")
    private String letterType;

    protected void deleteLetter() {
        super.delete();
    }
}
