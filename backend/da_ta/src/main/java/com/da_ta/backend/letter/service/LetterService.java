package com.da_ta.backend.letter.service;

import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.account.user.domain.repository.UserRepository;
import com.da_ta.backend.common.domain.Message;
import com.da_ta.backend.common.domain.exception.CustomException;
import com.da_ta.backend.letter.controller.dto.TextLetterCreateRequest;
import com.da_ta.backend.letter.controller.dto.common.Option;
import com.da_ta.backend.letter.controller.dto.common.TextLetterInfo;
import com.da_ta.backend.letter.domain.entity.*;
import com.da_ta.backend.letter.domain.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import static com.da_ta.backend.common.domain.exception.ErrorCode.*;

@RequiredArgsConstructor
@Service
public class LetterService {

    private final BackgroundRepository backgroundRepository;
    private final FloatedLetterRepository floatedLetterRepository;
    private final FontRepository fontRepository;
    private final ImageLetterRepository imageLetterRepository;
    private final LetterRepository letterRepository;
    private final TextLetterRepository textLetterRepository;
    private final UserRepository userRepository;

    @Transactional
    public Message createTextLetter(TextLetterCreateRequest textLetterCreateRequest) {
        Long userId = textLetterCreateRequest.getUserId();
        Option option = textLetterCreateRequest.getOption();
        TextLetterInfo textLetterInfo = textLetterCreateRequest.getTextLetterInfo();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        Background background = backgroundRepository.findById(textLetterInfo.getBackgroundId())
                .orElseThrow(() -> new CustomException(BACKGROUND_NOT_FOUND));
        Font font = fontRepository.findById(textLetterInfo.getFont_id())
                .orElseThrow(() -> new CustomException(FONT_NOT_FOUND));

        TextLetter textLetter = TextLetter.builder()
                .user(user)
                .ageOption(option.getAgeOption())
                .replyOption(option.getReplyOption())
                .background(background)
                .font(font)
                .title(textLetterInfo.getTitle())
                .content(textLetterInfo.getContent())
                .build();
        textLetterRepository.save(textLetter);
        floatLetter(textLetter);
        return new Message("");
    }

    public void floatLetter(Letter letter) {
        floatedLetterRepository.save(FloatedLetter.builder()
                .letter(letter)
                .build());
    }
}
