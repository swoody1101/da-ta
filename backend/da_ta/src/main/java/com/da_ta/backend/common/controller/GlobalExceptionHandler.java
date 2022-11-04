package com.da_ta.backend.common.controller;

import com.da_ta.backend.common.domain.Message;
import com.da_ta.backend.common.domain.exception.BadRequestException;
import com.da_ta.backend.common.domain.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({NotFoundException.class})
    private ResponseEntity<Message> handleNotFoundException(NotFoundException notFoundException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new Message(notFoundException.getErrorCode().getMessage()));
    }

    @ExceptionHandler({BadRequestException.class})
    private ResponseEntity<Message> handleBadRequestException(BadRequestException badRequestException) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new Message(badRequestException.getErrorCode().getMessage()));
    }
}
