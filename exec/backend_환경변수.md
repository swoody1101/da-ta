# backend 환경변수

1. backend/da_ta/src/main/resources 디렉토리에 `.env.properties` 파일 생성
2. 파일 내에 다음 항목들 입력

```
properties.datasource.url=[DB정보]
properties.datasource.username=[DB유저]
properties.datasource.password=[DB패스워드]

jwt.secret=[JWT암호화키]

properties.registration.kakao.client-id=[카카오ID정보]
properties.registration.kakao.client-secret=[카카오secret정보]
properties.registration.kakao.authorization-grant-type=[카카오authorization정보]
properties.registration.kakao.redirect-uri=[카카오서버redirect주소]
properties.registration.kakao.scope=[카카오동의항목]

properties.provider.kakao.authorization-uri=[카카오authorization주소]
properties.provider.kakao.token-uri=[카카오token주소]
properties.provider.kakao.user-info-uri=[카카오유저정보주소]
properties.provider.kakao.token-info-uri=[카카오token정보주소]
properties.provider.kakao.user-name-attribute=[카카오이름속성]

properties.provider.redis.user-name=[redis접속유저정보]
properties.provider.redis.user-password=[redis접속패스워드]
```
