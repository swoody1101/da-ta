package com.da_ta.backend.user.domain;

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
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "user_id"))
@Entity
public class User extends CommonEntity {

    @Column(nullable = false, unique = true)
    private String kakaoId;

    @Column(nullable = false, unique = true)
    private String nickname;

    private String age;

    @NotNull
    private Auth auth;

    @NotNull
    private boolean isAlertActive;

    @OneToOne(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private BanStatus banStatus;
}
