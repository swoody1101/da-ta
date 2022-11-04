package com.da_ta.backend.account.jwt;

import com.da_ta.backend.account.user.controller.dto.TokenInfo;
import com.da_ta.backend.account.user.domain.entity.User;
import com.da_ta.backend.common.domain.exception.WrongAccessException;
import com.da_ta.backend.util.JwtUtil;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;

import static com.da_ta.backend.common.domain.ErrorCode.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final int BEARER_TOKEN_BEGIN_INDEX = 7;
    private final String TOKEN_SUBJECT = "sub";
    private final String DELIMITER = " ";

    @Value("${spring.jwt.secret}")
    private String secretKey;

    @Value("${spring.jwt.response.header}")
    private String jwtHeader;

    @Value("${spring.jwt.token.prefix}")
    private String jwtTokenPrefix;

    private long accessTokenValidTime = Duration.ofMinutes(60).toMillis();
    private long refreshTokenValidTime = Duration.ofDays(14).toMillis();

    @Autowired
    private UserDetailsService userDetailsService;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public TokenInfo createAccessToken(User user) {
        return createToken(user, accessTokenValidTime);
    }

    public TokenInfo createRefreshToken(User user) {
        return createToken(user, refreshTokenValidTime);
    }

    public TokenInfo createToken(User user, long tokenValidTime) {
        Claims claims = Jwts.claims()
                .setSubject(user.getId().toString());
        claims.put("roles", user.getRole());
        Date now = new Date();
        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
        return TokenInfo.builder()
                .key(user.getId())
                .value(token)
                .expiredTime(tokenValidTime)
                .build();
    }

    public Authentication getAuthentication(String token) {
        HashMap<String, String> payloadMap = JwtUtil.getPayloadByToken(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(payloadMap.get(TOKEN_SUBJECT));
        return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
    }

    public String getUserId(String token) {
        return getAllClaims(getActualToken(token)).getSubject();
    }

    public String resolveAccessToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(jwtHeader);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(jwtTokenPrefix)) {
            return bearerToken.substring(BEARER_TOKEN_BEGIN_INDEX);
        } else {
            throw new WrongAccessException(WRONG_AUTHENTICATION_TYPE);
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.error("Invalid JWT signature");
            return false;
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT token");
            return false;
        } catch (IllegalArgumentException e) {
            log.error("JWT token is invalid");
            return false;
        }
    }

    public void setHeaderAccessToken(HttpHeaders headers, String accessToken) {
        headers.add(jwtHeader, accessToken);
    }

    public Claims getAllClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new WrongAccessException(ACCESS_TOKEN_EXPIRED);
        }
    }

    public String getActualToken(String token) {
        validateAuthorization(token);
        return token.split(DELIMITER)[1];
    }

    public void validateAuthorization(String token) {
        if (!token.startsWith(jwtTokenPrefix)) {
            throw new WrongAccessException(WRONG_TOKEN);
        }
    }
}
