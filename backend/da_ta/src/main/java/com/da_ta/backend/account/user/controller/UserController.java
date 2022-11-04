package com.da_ta.backend.account.user.controller;

import com.da_ta.backend.account.user.controller.dto.LoginRequest;
import com.da_ta.backend.account.user.controller.dto.LoginResponse;
import com.da_ta.backend.account.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        HttpHeaders headers = new HttpHeaders();
        LoginResponse loginResponse = userService.login(loginRequest, headers);
        log.info("access-token : " + headers);
        return ResponseEntity.status(HttpStatus.OK)
                .headers(headers)
                .body(loginResponse);
    }
}
