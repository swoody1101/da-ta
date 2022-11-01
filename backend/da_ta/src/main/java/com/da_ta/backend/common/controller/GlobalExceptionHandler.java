package com.da_ta.backend.common.controller;

import com.da_ta.backend.common.domain.exception.CustomException;
import com.da_ta.backend.common.domain.exception.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.da_ta.backend.common.domain.exception.ErrorCode.INTERNAL_SERVER_ERROR;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({CustomException.class})
    private ResponseEntity<ErrorResponse> handleCustomException(CustomException customException) {
        customException.getErrorCode();
        return ResponseEntity.status(customException.getErrorCode().getHttpStatus())
                .body(new ErrorResponse(customException.getErrorCode().getHttpStatus(),
                        customException.getErrorCode().getMessage()));
    }

    @ExceptionHandler({Exception.class})
    protected ResponseEntity handleServerException() {
        return new ResponseEntity(new ErrorResponse(INTERNAL_SERVER_ERROR.getHttpStatus(),
                INTERNAL_SERVER_ERROR.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
