package com.da_ta.backend.common.domain.exception;

import com.da_ta.backend.common.domain.ErrorCode;

public class WrongAccessException extends CommonException {

    public WrongAccessException(ErrorCode errorCode) {
        super(errorCode);
    }
}
