package com.da_ta.backend.account.user.controller;

import com.da_ta.backend.account.user.controller.dto.LoginRequest;
import com.da_ta.backend.account.user.controller.dto.LoginResponse;
import com.da_ta.backend.account.user.service.UserService;
import com.da_ta.backend.common.domain.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final String AUTHORIZATION = "Authorization";
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        HttpHeaders headers = new HttpHeaders();
        LoginResponse loginResponse = userService.login(loginRequest, headers);
        return ResponseEntity.status(HttpStatus.OK)
                .headers(headers)
                .body(loginResponse);
    }

    @GetMapping("/reissue")
    public ResponseEntity<Message> reissue(@RequestHeader(AUTHORIZATION) String token) {
        HttpHeaders headers = new HttpHeaders();
        Message message = userService.reissue(headers, token);
        return ResponseEntity.status(HttpStatus.OK)
                .headers(headers)
                .body(message);
    }
}
