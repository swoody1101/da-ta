package com.da_ta.backend.account.user.domain.entity;

import com.da_ta.backend.common.domain.CommonEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "ban_status_id"))
@Entity
public class BanStatus extends CommonEntity {

    @Builder.Default
    private int warningCount = 0;

    @Builder.Default
    private boolean isBan = false;

    @OneToOne(mappedBy = "banStatus")
    private User user;

    public void updateWarningCount() {
        this.warningCount++;
    }

    public void updateIsBan() {
        this.isBan = true;
    }
}
