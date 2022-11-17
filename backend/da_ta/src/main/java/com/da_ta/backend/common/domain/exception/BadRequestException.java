package com.da_ta.backend.common.domain.exception;

import com.da_ta.backend.common.domain.ErrorCode;

public class BadRequestException extends CommonException {

    public BadRequestException(ErrorCode errorCode) {
        super(errorCode);
    }
}
