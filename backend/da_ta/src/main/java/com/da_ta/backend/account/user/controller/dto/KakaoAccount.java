package com.da_ta.backend.account.user.controller.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class KakaoAccount {

    private Boolean hasEmail;
    private Boolean emailNeedsAgreement;
    private Boolean isEmailValid;
    private Boolean isEmailVerified;
    private String email;
    private Boolean hasAgeRange;
    private Boolean ageRangeNeedsAgreement;
    private String ageRange;
}
