package com.da_ta.backend.account.jwt;

import com.da_ta.backend.common.domain.exception.WrongAccessException;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.da_ta.backend.common.domain.ErrorCode.ACCESS_TOKEN_EXPIRED;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            if (request.getServletPath().startsWith("/api/v1/user/reissue") || request.getServletPath().startsWith("/api/v1/user/login")) {
                filterChain.doFilter(request, response);
            } else {
                String accessToken = jwtTokenProvider.resolveAccessToken(request);
                if (StringUtils.hasText(accessToken) && jwtTokenProvider.validateToken(accessToken)) {
                    this.setAuthentication(accessToken);
                }
                filterChain.doFilter(request, response);
            }
        } catch (ExpiredJwtException e) {
            throw new WrongAccessException(ACCESS_TOKEN_EXPIRED);
        }
    }

    private void setAuthentication(String token) {
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
