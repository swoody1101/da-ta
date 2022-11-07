/**
 * @author mingyu
 * @description 카카오 소셜 로그인 관련 변수와 함수를 정의한 파일입니다.
 */
import { client } from "../utils/client";

const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
// const REDIRECT_URI = "http://localhost:3000/auth/oauth";
const REDIRECT_URI = "https://k7b106.p.ssafy.io/auth/oauth";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

/**
 * @description 클릭 시 카카오 소셜 로그인 페이지로 리다이렉트하는 함수
 */
export const clickToKakao = () => {
  window.location.href = `${KAKAO_AUTH_URL}`;
};

/**
 * @description 카카오 소셜 로그인 시 받은 인가코드로 백엔드 서버에 로그인 요청을 보냄
 * @param {string} code
 * @returns response
 */
export const kakaoLoginByAuthCode = async (code) => {
  const response = await client
    .post("/user/login", {
      authorizationCode: code,
    })
    .then((res) => res)
    .catch((error) => error.response);

  return response;
};
