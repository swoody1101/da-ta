package com.da_ta.backend.account.admin.controller;

import com.da_ta.backend.account.admin.controller.dto.FindUsersResponse;
import com.da_ta.backend.account.admin.controller.dto.UpdateRoleRequest;
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
}
