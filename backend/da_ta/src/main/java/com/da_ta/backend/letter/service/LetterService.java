package com.da_ta.backend.letter.service;

import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.account.user.domain.repository.UserRepository;
import com.da_ta.backend.common.domain.Message;
import com.da_ta.backend.common.domain.exception.NotFoundException;
import com.da_ta.backend.letter.controller.dto.ImageLetterCreateRequest;
import com.da_ta.backend.letter.controller.dto.TextLetterCreateRequest;
import com.da_ta.backend.letter.controller.dto.common.ImageLetterInfo;
import com.da_ta.backend.letter.controller.dto.common.Option;
import com.da_ta.backend.letter.controller.dto.common.TextLetterInfo;
import com.da_ta.backend.letter.domain.entity.*;
import com.da_ta.backend.letter.domain.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import static com.da_ta.backend.common.domain.ErrorCode.*;
import static com.da_ta.backend.common.domain.SuccessCode.IMAGE_LETTER_CREATED;
import static com.da_ta.backend.common.domain.SuccessCode.TEXT_LETTER_CREATED;

@RequiredArgsConstructor
@Service
public class LetterService {

    private final BackgroundRepository backgroundRepository;
    private final FloatedLetterRepository floatedLetterRepository;
    private final FontRepository fontRepository;
    private final ImageLetterRepository imageLetterRepository;
    private final TextLetterRepository textLetterRepository;
    private final UserRepository userRepository;

    @Transactional
    public Message createTextLetter(TextLetterCreateRequest textLetterCreateRequest) {
        Option option = textLetterCreateRequest.getOption();
        TextLetterInfo textLetterInfo = textLetterCreateRequest.getTextLetterInfo();
        User user = findUser(textLetterCreateRequest.getUserId());
        Background background = findBackground(textLetterInfo.getBackgroundId());
        Font font = findFont(textLetterInfo.getFontId());
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
        return new Message(TEXT_LETTER_CREATED.getMessage());
    }

    @Transactional
    public Message createImageLetter(ImageLetterCreateRequest imageLetterCreateRequest) {
        Option option = imageLetterCreateRequest.getOption();
        ImageLetterInfo imageLetterInfo = imageLetterCreateRequest.getImageLetterInfo();
        User user = findUser(imageLetterCreateRequest.getUserId());
        Background background = findBackground(imageLetterInfo.getBackgroundId());
        ImageLetter imageLetter = ImageLetter.builder()
                .user(user)
                .ageOption(option.getAgeOption())
                .replyOption(option.getReplyOption())
                .background(background)
                .title(imageLetterInfo.getTitle())
                .imageLetterUrl(imageLetterInfo.getImageLetterUrl())
                .build();
        imageLetterRepository.save(imageLetter);
        floatLetter(imageLetter);
        return new Message(IMAGE_LETTER_CREATED.getMessage());
    }

    public void floatLetter(Letter letter) {
        floatedLetterRepository.save(FloatedLetter.builder()
                .letter(letter)
                .build());
    }

    public User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
    }

    public Background findBackground(Long backgroundId) {
        return backgroundRepository.findById(backgroundId)
                .orElseThrow(() -> new NotFoundException(BACKGROUND_NOT_FOUND));
    }

    public Font findFont(Long fontId) {
        return fontRepository.findById(fontId)
                .orElseThrow(() -> new NotFoundException(FONT_NOT_FOUND));
    }
}
