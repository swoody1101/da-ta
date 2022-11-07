package com.da_ta.backend.account.admin.controller;

import com.da_ta.backend.account.admin.controller.dto.FindUsersResponse;
import com.da_ta.backend.account.admin.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final String AUTHORIZATION = "Authorization";
    private final AdminService adminService;

    @GetMapping
    public ResponseEntity<FindUsersResponse> findUsers(@RequestHeader(AUTHORIZATION) String token) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(adminService.findUsers(token));
    }
}
