package com.da_ta.backend.letter.service;

import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.account.user.domain.repository.UserRepository;
import com.da_ta.backend.common.domain.Message;
import com.da_ta.backend.common.domain.exception.CustomException;
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

import static com.da_ta.backend.common.domain.exception.ErrorCode.*;

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
        Font font = fontRepository.findById(textLetterInfo.getFontId())
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
        return new Message("편지를 성공적으로 바다에 띄웠습니다.");
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
        return new Message("편지를 성공적으로 바다에 띄웠습니다.");
    }

    public void floatLetter(Letter letter) {
        floatedLetterRepository.save(FloatedLetter.builder()
                .letter(letter)
                .build());
    }

    public User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
    }

    public Background findBackground(Long backgroundId) {
        return backgroundRepository.findById(backgroundId)
                .orElseThrow(() -> new CustomException(BACKGROUND_NOT_FOUND));
    }
}
