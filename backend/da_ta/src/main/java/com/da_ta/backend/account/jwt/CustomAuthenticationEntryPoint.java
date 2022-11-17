package com.da_ta.backend.account.jwt;

import com.da_ta.backend.common.domain.exception.WrongAccessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.da_ta.backend.common.domain.ErrorCode.*;

@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        String exception = (String) request.getAttribute("exception");
        if (exception.equals(WRONG_AUTHENTICATION_TYPE.getMessage())) {
            throw new WrongAccessException(WRONG_AUTHENTICATION_TYPE);
        } else if (exception.equals(ACCESS_TOKEN_EXPIRED.getMessage())) {
            throw new WrongAccessException(ACCESS_TOKEN_EXPIRED);
        } else if (exception.equals(WRONG_TOKEN.getMessage())) {
            throw new WrongAccessException(WRONG_TOKEN);
        }
    }
}
