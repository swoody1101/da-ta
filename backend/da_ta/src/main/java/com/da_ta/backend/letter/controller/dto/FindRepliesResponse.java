package com.da_ta.backend.letter.controller.dto;

import com.da_ta.backend.letter.controller.dto.common.ReplyItem;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class FindRepliesResponse {

    List<ReplyItem> replies;
}
