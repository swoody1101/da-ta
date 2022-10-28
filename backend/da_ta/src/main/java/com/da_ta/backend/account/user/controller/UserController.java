package com.da_ta.backend.account.user.controller;

import com.da_ta.backend.account.user.controller.dto.LoginRequest;
import com.da_ta.backend.account.user.controller.dto.LoginResponse;
import com.da_ta.backend.account.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(userService.login(loginRequest));
    }
}
