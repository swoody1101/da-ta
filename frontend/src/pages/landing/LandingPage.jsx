import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import MainBackgroundSky from "../../components/atoms/MainBackgroundSky";
import Footer from "../../components/molecules/Footer";
import Chatbox from "../../components/atoms/Chatbox";
import MainSeaGradient from "../../components/atoms/MainSeaGradient";
import Title from "../../components/atoms/Title";
import { MainWave } from "../../components/atoms/MainWave";
import { MainWave2 } from "../../components/atoms/MainWave2";
import {
  MainText,
  MainTestText,
  MainSmallText,
} from "../../components/atoms/Text";
import BottleOfLetter from "../../components/atoms/BottleOfLetter";
import ScrollToTop from "react-scroll-to-top";
import Button from "./../../components/atoms/Button";
import { SizeTypes, SIZE_WIDE } from "./../../constants/Sizes";

import BackgroundGradient from "../../components/atoms/BackgroundGradient";
import MouseScrollDownArrowGroup from "../../components/molecules/MouseScrollDownArrowGroup";
import MouseScrollDownMouse from "../../components/atoms/MainScrollDownMouse";

import ChatboxGroup from "../../components/molecules/Landing/ChatBoxGroup";
import Modal from "../../components/organisms/Modal";

const LandingPage = () => {
  const navigate = useNavigate();

  const [chatboxToggle, setChatBoxToggle] = useState(false); // 물병 클릭시 뜨는 말풍선 토글

  useEffect(() => {
    AOS.init({ duration: 500, easing: "ease-in-out-back" });
  });

  return (
    <>
      {/* <BackgroundGradient start={"aaa"} end={"aaa"} /> */}
      <BackgroundGradient start={"E2AAFD"} end={"FFDFC2"} />

      <TextWrapper>
        <MainSmallText
          margin="20vh 0 0 0"
          data-aos-duration="500"
          data-aos="flip-up"
        >
          [100]개의 편지가 바다에 떠 있습니다
        </MainSmallText>
        <MainText
          margin="8vh 0 0 0"
          mFont_size={SizeTypes.MOBILE_MAIN_TEXT_SIZE}
        >
          안녕하세요! 😏 <br /> 여기는 '닿다'예요
        </MainText>

        <div data-aos="zoom-in-up" data-aos-anchor-placement="bottom-bottom">
          <MainText
            margin="90vh 0 0 0"
            mFont_size={SizeTypes.MOBILE_MAIN_TEXT_SIZE}
          >
            여기선 익명으로 <br />
            마음을 털어놓을 수 있어요
          </MainText>
        </div>
        <div data-aos="zoom-in-up" data-aos-anchor-placement="bottom-bottom">
          <MainText
            margin="65vh 0 0 0"
            mFont_size={SizeTypes.MOBILE_MAIN_TEXT_SIZE}
          >
            아무에게도 말하지 못했던 것들을
            <br />
            적어서 보내보세요
          </MainText>
        </div>
        <div data-aos="zoom-in-up" data-aos-anchor-placement="bottom-bottom">
          <MainText
            margin="65vh 0 0 0"
            mFont_size={SizeTypes.MOBILE_MAIN_TEXT_SIZE}
          >
            혹시 몰라요! <br /> 누군가에게 답을 받을 수도 있겠죠?
          </MainText>
        </div>
        <div data-aos="zoom-in-up" data-aos-anchor-placement="bottom-bottom">
          <MainText
            margin="65vh 0 0 0"
            mFont_size={SizeTypes.MOBILE_MAIN_TEXT_SIZE}
          >
            당신의 물병을 '닿다'에 던져보세요!
          </MainText>
        </div>

        <br />
        <div
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          data-aos-anchor-placement="bottom-bottom"
        >
          <Button
            hoverBgOpacity="0.5"
            fontSize="1.4rem"
            height="3rem"
            width="18rem"
            margin="1% 0 0 0"
            shadow={true}
            onClick={() => navigate("/write")}
          >
            💌 &nbsp; 물병 던지기 &nbsp; 💌
          </Button>
        </div>
      </TextWrapper>

      <ChatboxGroup></ChatboxGroup>

      {/* 물병 수정 예정 */}
      {/* <BottleWrapper>
        <BottleOfLetter
          mWidth={SizeTypes.MOBILE_MAIN_BOTTLE_WIDTH}
          mHeight={SizeTypes.MOBILE_MAIN_BOTTLE_HEIGHT}
          // setChatBoxToggle={() => setChatBoxToggle(true)}
        />
      </BottleWrapper> */}

      {/* <MouseScrollDownMouseWrapper>
        <MainText>Scroll</MainText>
        <MouseScrollDownMouse />
      </MouseScrollDownMouseWrapper> */}

      <MouseScrollDownArrowWrapper>
        <MouseScrollDownArrowGroup />
      </MouseScrollDownArrowWrapper>

      {/* 바다 수정 예정  */}
      <MainWave opacity={0.5} frequency={16} isRight={true}></MainWave>
      <MainWave opacity={0.6} frequency={8} isRight={true}></MainWave>
      <MainWave opacity={0.4} frequency={13} isRight={false}></MainWave>
      <MainWave opacity={0.5} frequency={20} isRight={false}></MainWave>
      <MainWave opacity={0.3} frequency={20} isRight={false}></MainWave>
      <MainWave2 opacity={0.8} frequency={20} isRight={false}></MainWave2>
      <MainWave2 opacity={1} frequency={20} isRight={true}></MainWave2>

      <MainSeaGradient />

      <Footer />

      <ScrollToTop
        smooth
        color="#ffffff"
        width="30px"
        height="30px"
        // svgPath={{ strokeWidth: "20" }}
        strokeWidth="px"
        style={{
          backgroundColor: "rgba( 255, 255, 255, 0.4 )",
          borderRadius: "100px",
          border: "5px solid #ffffff",
          width: "55px",
          height: "55px",
          marginRight: "-35px",
          marginBottom: "-33px",
          // strokeWidth: "7",
        }}
      />
    </>
  );
};

const BottleWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  top: 56%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1.5;
`;

const TextWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MouseScrollDownArrowWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 5;
  top: 56%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MouseScrollDownMouseWrapper = styled.div`
  width: 100vw;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const ChatBoxWrapper = styled.div`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
`;

export default LandingPage;

{
  /* <div id="title-div" onclick="sayHello()"></div>;
function sayHello() {
  console.log("Hello there !!");
} */
}
