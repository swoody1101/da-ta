package com.da_ta.backend.common.domain.exception;

import com.da_ta.backend.common.domain.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommonException extends RuntimeException {

    private final ErrorCode errorCode;
}
