package com.da_ta.backend.account.admin.service;

import com.da_ta.backend.account.admin.controller.dto.FindUsersResponse;
import com.da_ta.backend.account.admin.controller.dto.UpdateRoleRequest;
import com.da_ta.backend.account.admin.controller.dto.UserItem;
import com.da_ta.backend.account.jwt.JwtTokenProvider;
import com.da_ta.backend.account.user.controller.dto.BanStatusInfo;
import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.account.user.domain.repository.UserRepository;
import com.da_ta.backend.common.domain.Message;
import com.da_ta.backend.common.domain.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

import static com.da_ta.backend.common.domain.ErrorCode.USER_NOT_FOUND;
import static com.da_ta.backend.common.domain.SuccessCode.ROLE_UPDATED;
import static com.da_ta.backend.common.domain.SuccessCode.WARNING_COUNT_UPDATED;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final int MAX_WARNING_COUNT = 3;
    private final static String TYPE_TEXT = "Text";
    private final static String TYPE_IMAGE = "Image";
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public FindUsersResponse findUsers(String token) {
        jwtTokenProvider.findUserByToken(token);
        return FindUsersResponse.builder()
                .users(userRepository.findAll()
                        .stream()
                        .map(user -> UserItem.builder()
                                .userId(user.getId())
                                .kakaoUserId(user.getKakaoUserId())
                                .nickname(user.getNickname())
                                .ageRange(user.getAge().getAgeRange())
                                .role(user.getRole())
                                .isActive(user.isActive())
                                .banStatus(BanStatusInfo.builder()
                                        .isBan(user.getBanStatus().isBan())
                                        .build())
                                .build()
                        ).collect(Collectors.toList()))
                .build();
    }

    public Message updateRole(String token, Long userId, UpdateRoleRequest updateRoleRequest) {
        jwtTokenProvider.findUserByToken(token);
        User user = findUserById(userId);
        user.updateRole(updateRoleRequest.getRole());
        userRepository.save(user);
        return new Message(ROLE_UPDATED.getMessage());
    }

    public FindAccusedLettersResponse findAccusedLetters(String token) {
        jwtTokenProvider.findUserByToken(token);
        List<AccusedLetter> accusedLetters = new ArrayList<>();
        letterAccusationRepository.findAll()
                .stream()
                .forEach(accusedLetter -> {
                    Letter letter = findLetterById(accusedLetter.getLetter().getId());
                    User reportedUser = findUserById(letter.getWriter().getId());
                    String content;
                    if (letter.getLetterType().equals(TYPE_TEXT)) {
                        content = findTextLetterById(letter.getId()).getContent();
                    } else if (letter.getLetterType().equals(TYPE_IMAGE)) {
                        content = findImageLetterById(letter.getId()).getImageLetterUrl();
                    } else {
                        throw new NotFoundException(LETTER_TYPE_NOT_FOUND);
                    }
                    accusedLetters.add(
                            AccusedLetter.builder()
                                    .accusedLetterId(accusedLetter.getId())
                                    .reportedTime(accusedLetter.getCreatedDate())
                                    .reporterNickname(findUserById(accusedLetter.getReporterId()).getNickname())
                                    .reportedUserId(reportedUser.getId())
                                    .reportedNickname(reportedUser.getNickname())
                                    .reason(accusedLetter.getReason())
                                    .content(content)
                                    .isSolved(accusedLetter.isSolved())
                                    .build()
                    );
                });
        return FindAccusedLettersResponse.builder()
                .accusedLetters(accusedLetters)
                .build();
    }

    public Message updateAccusedLetter(String token, Long letterAccusationId) {
        jwtTokenProvider.findUserByToken(token);
        LetterAccusation letterAccusation = findLetterAccusationById(letterAccusationId);
        letterAccusation.updateIsSolved();
        User reportedUser = findUserById(findLetterById(letterAccusation.getLetter().getId()).getWriter().getId());
        reportedUser.getBanStatus().updateWarningCount();
        if (reportedUser.getBanStatus().getWarningCount() == MAX_WARNING_COUNT) {
            reportedUser.getBanStatus().updateIsBan();
        }
        letterAccusationRepository.save(letterAccusation);
        userRepository.save(reportedUser);
        return new Message(ACCUSED_LETTER_SOLVED.getMessage());
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
    }
}
