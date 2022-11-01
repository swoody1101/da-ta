import React from "react";
import { useEffect } from "react";
import { kakaoLoginByAuthCode } from "../api/AuthAPI";
import { Wrapper } from "./../styles/Wrapper";

const SocialLogin = () => {
  useEffect(async () => {
    const code = new URL(window.location.href).searchParams.get("code");
    const response = await kakaoLoginByAuthCode(code);
    console.log(response);
  }, []);
  return (
    <>
      <Wrapper>소셜 로그인</Wrapper>
    </>
  );
};

export default SocialLogin;
