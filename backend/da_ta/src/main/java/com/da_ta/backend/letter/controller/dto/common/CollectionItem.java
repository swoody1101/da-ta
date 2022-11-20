package com.da_ta.backend.letter.controller.dto.common;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CollectionItem {

    private Long id;
    private String title;
    private Long writerId;
    private String writerNickname;
    private LocalDateTime writtenDate;
}
