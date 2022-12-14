package com.da_ta.backend.account.admin.controller;

import com.da_ta.backend.account.admin.controller.dto.*;
import com.da_ta.backend.account.admin.service.AdminService;
import com.da_ta.backend.common.domain.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final AdminService adminService;

    @GetMapping
    public ResponseEntity<FindUsersResponse> findUsers(@RequestHeader(AUTHORIZATION) String token) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(adminService.findUsers(token));
    }

    @PutMapping("/{user_id}")
    public ResponseEntity<Message> updateRole(@RequestHeader(AUTHORIZATION) String token,
                                              @PathVariable("user_id") Long userId,
                                              @RequestBody UpdateRoleRequest updateRoleRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adminService.updateRole(token, userId, updateRoleRequest));
    }

    @GetMapping("/accusation/letter")
    public ResponseEntity<FindAccusedLettersResponse> findAccusedLetters(@RequestHeader(AUTHORIZATION) String token) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(adminService.findAccusedLetters(token));
    }

    @PostMapping("/accusation/letter/{letter_accusation_id}")
    public ResponseEntity<Message> updateAccusedLetter(@RequestHeader(AUTHORIZATION) String token,
                                                       @PathVariable("letter_accusation_id") Long letterAccusationId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adminService.updateAccusedLetter(token, letterAccusationId));
    }

    @DeleteMapping("/accusation/letter/{letter_accusation_id}")
    public ResponseEntity<Message> deleteAccusedLetter(@RequestHeader(AUTHORIZATION) String token,
                                                       @PathVariable("letter_accusation_id") Long letterAccusationId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(adminService.deleteAccusedLetter(token, letterAccusationId));
    }

    @GetMapping("/accusation/answer")
    public ResponseEntity<FindAccusedAnswersResponse> findAccusedAnswers(@RequestHeader(AUTHORIZATION) String token) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(adminService.findAccusedAnswers(token));
    }

    @PostMapping("/accusation/answer/{answer_accusation_id}")
    public ResponseEntity<Message> updateAccusedAnswer(@RequestHeader(AUTHORIZATION) String token,
                                                       @PathVariable("answer_accusation_id") Long answerAccusationId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adminService.updateAccusedAnswer(token, answerAccusationId));
    }

    @DeleteMapping("/accusation/answer/{answer_accusation_id}")
    public ResponseEntity<Message> deleteAccusedAnswer(@RequestHeader(AUTHORIZATION) String token,
                                                       @PathVariable("answer_accusation_id") Long answerAccusationId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(adminService.deleteAccusedAnswer(token, answerAccusationId));
    }

    @GetMapping("/question")
    public ResponseEntity<FindTodayQuestionsResponse> findTodayQuestions(@RequestHeader(AUTHORIZATION) String token,
                                                                         @RequestParam String date) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(adminService.findTodayQuestions(token, date));
    }

    @GetMapping("/question/{question_id}")
    public ResponseEntity<TodayQuestionItem> findTodayQuestion(@RequestHeader(AUTHORIZATION) String token,
                                                               @PathVariable("question_id") Long questionId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(adminService.findTodayQuestion(token, questionId));
    }

    @PostMapping("/question")
    public ResponseEntity<Message> createTodayQuestion(@RequestHeader(AUTHORIZATION) String token,
                                                       @RequestBody CreateTodayQuestionRequest createTodayQuestionRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adminService.createTodayQuestion(token, createTodayQuestionRequest));
    }

    @PutMapping("/question/{question_id}")
    public ResponseEntity<Message> updateTodayQuestion(@RequestHeader(AUTHORIZATION) String token,
                                                       @PathVariable("question_id") Long questionId,
                                                       @RequestBody UpdateTodayQuestionRequest updateTodayQuestionRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adminService.updateTodayQuestion(token, questionId, updateTodayQuestionRequest));
    }

    @DeleteMapping("/question/{question_id}")
    public ResponseEntity<Message> deleteTodayQuestion(@RequestHeader(AUTHORIZATION) String token,
                                                       @PathVariable("question_id") Long questionId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(adminService.deleteTodayQuestion(token, questionId));
    }

    @GetMapping("/answer/{question_id}")
    public ResponseEntity<FindTodayAnswersResponse> findTodayAnswers(@RequestHeader(AUTHORIZATION) String token,
                                                                     @PathVariable("question_id") Long questionId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(adminService.findTodayAnswers(token, questionId));
    }
}
