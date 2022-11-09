package com.da_ta.backend.question.domain.entity;

import com.da_ta.backend.common.domain.CommonEntity;
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
@AttributeOverride(name = "id", column = @Column(name = "answer_accusation_id"))
@Entity
public class AnswerAccusation extends CommonEntity {

    @NotNull
    private Long reporter;

    @NotNull
    private String reason;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "today_answer_id")
    private TodayAnswer todayAnswer;
}
