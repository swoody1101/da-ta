package com.da_ta.backend.common.domain.exception;

import com.da_ta.backend.common.domain.ErrorCode;

public class NotFoundException extends CommonException {

    public NotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
