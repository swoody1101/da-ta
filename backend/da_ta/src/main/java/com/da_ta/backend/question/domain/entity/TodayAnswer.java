package com.da_ta.backend.question.domain.entity;

import com.da_ta.backend.account.user.domain.entity.User;
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
@AttributeOverride(name = "id", column = @Column(name = "today_answer_id"))
@Entity
public class TodayAnswer extends CommonEntity {

    @NotNull
    private String answer;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "today_question_id")
    private TodayQuestion todayQuestion;

    @OneToOne(mappedBy = "todayAnswer")
    private AnswerAccusation answerAccusation;

    public void deleteTodayAnswer() {
        super.delete();
    }
}
