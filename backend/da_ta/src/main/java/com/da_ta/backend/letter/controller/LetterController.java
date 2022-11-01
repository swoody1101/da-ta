package com.da_ta.backend.letter.controller;

import com.da_ta.backend.common.domain.Message;
import com.da_ta.backend.letter.controller.dto.ImageLetterCreateRequest;
import com.da_ta.backend.letter.controller.dto.TextLetterCreateRequest;
import com.da_ta.backend.letter.service.LetterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/letters")
public class LetterController {

    private final LetterService letterService;

    @PostMapping("/1")
    public ResponseEntity<Message> createTextLetter(@RequestBody TextLetterCreateRequest textLetterCreateRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(letterService.createTextLetter(textLetterCreateRequest));
    }

    @PostMapping("/2")
    public ResponseEntity<Message> createImageLetter(@RequestBody ImageLetterCreateRequest imageLetterCreateRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(letterService.createImageLetter(imageLetterCreateRequest));
    }
}
