import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import MainBackgroundSky from "../../components/atoms/MainBackgroundSky";
import Footer from "../../components/molecules/Footer";
import Chatbox from "../../components/atoms/Chatbox";
import MainSeaGradient from "../../components/atoms/MainSeaGradient";
import Title from "../../components/atoms/Title";
import { MainWave } from "../../components/atoms/MainWave";
import { MainWave2 } from "../../components/atoms/MainWave2";
import { MainText, MainSmallText } from "../../components/atoms/Text";
import BottleOfLetter from "../../components/atoms/BottleOfLetter";
import ScrollToTop from "react-scroll-to-top";
import Button from "./../../components/atoms/Button";
import MouseScrollDown from "../../components/atoms/MouseScrollDown";

import BackgroundGradient from "../../components/atoms/BackgroundGradient";
import MouseScrollDownArrow from "../../components/atoms/MouseScrollDownArrow";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <BackgroundGradient start={"aaa"} end={"aaa"} /> */}
      <BackgroundGradient start={"E2AAFD"} end={"FFDFC2"} />

      <TextWrapper>
        <MainSmallText margin="10rem 0 0 0">
          [100]개의 편지가 바다에 떠 있습니다
        </MainSmallText>
        <MainText margin="5rem 0 0 0">
          안녕하세요! <br /> 여기는 '닿다'예요
        </MainText>
        <MainText margin="60rem 0 0 0">
          여기선 익명으로 <br />
          마음을 털어놓을 수 있어요
        </MainText>
        <MainText margin="40rem 0 0 0">
          아무에게도 말하지 못했던 것들을
          <br />
          적어서 보내보세요
        </MainText>
        <MainText margin="40rem 0 0 0">
          혹시 몰라요! <br /> 누군가에게 답을 받을 수도 있겠죠?
        </MainText>
        <MainText margin="40rem 0 0 0">
          행운에 닿기를 바라며 물병을 던져볼까요?
        </MainText>

        <Button
          hoverBgOpacity="0.5"
          fontSize="1.5rem"
          height="3rem"
          width="20rem"
          margin="1% 0 0 0"
          shadow={true}
          onClick={() => navigate("/write")}
        >
          물병 던지기
        </Button>
      </TextWrapper>

      <BottleWrapper>
        <BottleOfLetter />
      </BottleWrapper>

      <MouseScrollDownArrow
        width="100px"
        height="100px"
        animation-delay="0.2s"
      ></MouseScrollDownArrow>

      {/* <Scroll_arrow
        width="100px"
        height="100px"
        animation-delay="0.2s"
        margin-top="6px"
      ></Scroll_arrow>
      <Scroll_arrow
        width="100px"
        height="100px"
        animation-delay="0.2s"
        margin-top="6px"
      ></Scroll_arrow>
      <Scroll_arrow
        width="100px"
        height="100px"
        animation-delay="0.2s"
        margin-top="6px"
      ></Scroll_arrow> */}

      <MainWave opacity={0.5} frequency={16} isRight={true}></MainWave>
      <MainWave opacity={0.6} frequency={8} isRight={true}></MainWave>
      <MainWave opacity={0.4} frequency={13} isRight={false}></MainWave>
      <MainWave opacity={0.5} frequency={20} isRight={false}></MainWave>
      <MainWave opacity={0.3} frequency={20} isRight={false}></MainWave>
      <MainWave2 opacity={0.8} frequency={20} isRight={false}></MainWave2>
      <MainWave2 opacity={1} frequency={20} isRight={true}></MainWave2>

      <MainSeaGradient />

      <Footer />

      <ScrollToTop smooth color="#6f00ff" border="20" />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BottleWrapper = styled.div`
  display: flex;
  position: absolute;
  margin-top: 40vh;
  margin-left: 50vw;
  flex-direction: row;
  justify-content: center;
`;

const TextWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default LandingPage;
