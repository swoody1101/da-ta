package com.da_ta.backend.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Age {

    AGE_0S("0대", 0, 9),
    AGE_10S("10대", 10, 19),
    AGE_20S("20대", 20, 29),
    AGE_30S("30대", 30, 39),
    AGE_40S("40대", 40, 49),
    AGE_50S("50대", 50, 59),
    AGE_60S("60대", 60, 200),
    AGE_ALL("전체", 0, 200);

    private final String ageRange;
    private final int startAge;
    private final int finishAge;
}
