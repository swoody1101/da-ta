package com.da_ta.backend.letter.controller.dto;

import com.da_ta.backend.letter.controller.dto.common.CollectionItem;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class FindLetterCollectionResponse {

    private List<CollectionItem> collection;
}
