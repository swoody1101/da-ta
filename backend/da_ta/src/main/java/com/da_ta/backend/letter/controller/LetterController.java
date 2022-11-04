package com.da_ta.backend.letter.controller;

import com.da_ta.backend.common.domain.Message;
import com.da_ta.backend.letter.controller.dto.ImageLetterCreateRequest;
import com.da_ta.backend.letter.controller.dto.ReceiveFloatedLetterResponse;
import com.da_ta.backend.letter.controller.dto.ReplyCreateRequest;
import com.da_ta.backend.letter.controller.dto.TextLetterCreateRequest;
import com.da_ta.backend.letter.service.LetterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{recipient_id}")
    public ResponseEntity<ReceiveFloatedLetterResponse> receiveFloatedLetter(@PathVariable("recipient_id") Long recipientId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(letterService.receiveFloatedLetter(recipientId));
    }

    @PutMapping("/{floated_letter_id}")
    public ResponseEntity<Message> refloatLetter(@PathVariable("floated_letter_id") Long floatedLetterId) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(letterService.updateFloatedLetter(floatedLetterId));
    }

    @PostMapping("/replies/{letter_id}")
    public ResponseEntity<Message> reply(@PathVariable("letter_id") Long LetterId, @RequestBody ReplyCreateRequest replyCreateRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(letterService.createReply(LetterId, replyCreateRequest));
    }

    @PutMapping("/replies/{reply_id}")
    public ResponseEntity<Message> checkReplyReception(@PathVariable("reply_id") Long replyId) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(letterService.checkReplyReception(replyId));
    }

    @PostMapping("/collect/{user_id}/{letter_id}")
    public ResponseEntity<Message> collectLetter(@PathVariable("user_id") Long userId, @PathVariable("letter_id") Long letterId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(letterService.saveLetter(userId, letterId));
    }
}
