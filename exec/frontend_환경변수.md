# frontend 환경변수

1. frontend 루트 디렉토리에 `.env` 파일 생성
2. 파일 내에 다음 항목들 입력

```
REACT_APP_REST_API_DOMAIN=[백엔드 도메인 주소]

REACT_APP_KAKAO_API_KEY=[카카오 앱키]
REACT_APP_KAKAO_CLIENT_SECRET=[카카오 클라이언트 시크릿]
REACT_APP_KAKAO_GRANT_TYPE=[카카오 grant type]
REACT_APP_KAKAO_REDIRECT_URI=[카카오 소셜 로그인 redirect uri]

REACT_APP_KAKAO_AUTHORIZATION_URI=[카카오 authorization uri]
REACT_APP_KAKAO_TOKEN_URI=[카카오 token uri]

REACT_APP_FIREBASE_API_KEY=[파이어베이스 앱키]
REACT_APP_FIREBASE_APP_ID=[파이어베이스 앱아이디]
```
