package com.da_ta.backend.common.domain.exception;

import com.da_ta.backend.common.domain.ErrorCode;

public class UnauthorizedException extends CommonException {

    public UnauthorizedException(ErrorCode errorCode) {
        super(errorCode);
    }
}
