package com.da_ta.backend.account.admin.controller.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class FindUsersResponse {

    private List<UserItem> users;
}
