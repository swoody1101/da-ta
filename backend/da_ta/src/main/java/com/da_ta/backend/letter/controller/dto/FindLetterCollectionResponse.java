package com.da_ta.backend.letter.controller.dto;

import com.da_ta.backend.letter.controller.dto.common.LetterItem;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class FindLetterCollectionResponse {

    private List<LetterItem> letters;
}
