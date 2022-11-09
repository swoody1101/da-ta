import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { media } from "../../utils/styleUtil";

import { popWarningAlert } from "./../../utils/sweetAlert";
import { useRecoilValue } from "recoil";
import { loginState } from "./../../recoil/Atoms";

import Footer from "../../components/molecules/Footer";
import MainSeaGradient from "../../components/atoms/MainSeaGradient";
import { MainWave2 } from "../../components/atoms/MainWave2";
import { MainText, MainSmallText } from "../../components/atoms/Text";
// import BottleOfLetter from "../../components/atoms/BottleOfLetter";
import ScrollToTop from "react-scroll-to-top";
import Button from "./../../components/atoms/Button";
import { SizeTypes, SIZE_WIDE } from "./../../constants/Sizes";
import BackgroundGradient from "../../components/atoms/BackgroundGradient";
import MouseScrollDownArrowGroup from "../../components/molecules/MouseScrollDownArrowGroup";

import ChatBoxGroup from "../../components/molecules/landing/ChatBoxGroup";
import { BottleOfLetterBtn } from "../../components/atoms/BottleOfLetterBtn";

import Modal from "../../components/organisms/Modal";

const LandingPage = () => {
  const navigate = useNavigate();

  const [chatboxVisible, setChatBoxVisible] = useState(false); // 물병 클릭시 뜨는 말풍선 토글

  const isLogin = useRecoilValue(loginState);

  /**
   * @description chatbox visible event
   */
  const handleChatboxVisible = (e) => {
    setChatBoxVisible(!chatboxVisible);
  };

  /**
   * @description 물병 던지기 Button의 isLogin 확인 및 navigate
   */
  const HandleIsLoginCheck = (event) => {
    return isLogin
      ? navigate("/write")
      : { ...popWarningAlert("", "로그인 후 이용해주세요.") };
  };

  /**
   * @description AOS 이벤트 조정용 UseEffect
   */
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
            onClick={() => HandleIsLoginCheck()}
          >
            💌 &nbsp; 물병 던지기 &nbsp; 💌
          </Button>
        </div>
      </TextWrapper>

      {/* 오늘의 질문 말풍선 */}
      {/* <ChatboxGroup></ChatboxGroup> */}

      {/* 물병 수정 예정 */}
      <BottleWrapper>
        {/* <BottleOfLetter
          mWidth={SizeTypes.MOBILE_MAIN_BOTTLE_WIDTH}
          mHeight={SizeTypes.MOBILE_MAIN_BOTTLE_HEIGHT}
          // setChatBoxToggle={() => setChatBoxToggle(true)}
        /> */}

        <BottleOfLetterBtn
          onClick={() => handleChatboxVisible(!chatboxVisible)}
        ></BottleOfLetterBtn>
      </BottleWrapper>
      {chatboxVisible ? (
        <ChatBoxWrapper>
          <ChatboxGroup></ChatboxGroup>
        </ChatBoxWrapper>
      ) : null}

      {/* <MouseScrollDownMouseWrapper>
        <MainText>Scroll</MainText>
        <MouseScrollDownMouse />
      </MouseScrollDownMouseWrapper> */}

      <MouseScrollDownArrowWrapper>
        <MouseScrollDownArrowGroup />
      </MouseScrollDownArrowWrapper>

      {/* 바다 수정 예정  */}
      {/* <MainWave opacity={0.5} frequency={16} isRight={true}></MainWave>
      <MainWave opacity={0.6} frequency={8} isRight={true}></MainWave>
      <MainWave opacity={0.4} frequency={13} isRight={false}></MainWave>
      <MainWave opacity={0.5} frequency={20} isRight={false}></MainWave>
      <MainWave opacity={0.3} frequency={20} isRight={false}></MainWave> */}
      <MainWave2 opacity={0.4} frequency={16} isRight={false}></MainWave2>
      <MainWave2 opacity={0.6} frequency={13} isRight={false}></MainWave2>
      <MainWave2 opacity={0.8} frequency={20} isRight={false}></MainWave2>
      <MainWave2 opacity={0.8} frequency={20} isRight={true}></MainWave2>
      <MainWave2 opacity={0.4} frequency={16} isRight={true}></MainWave2>
      <MainWave2 opacity={0.6} frequency={13} isRight={true}></MainWave2>
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
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  top: 160px;

  ${media.tablet1`
  top: 10rem;
`};
  ${media.phone`
  top: 3.5rem;
`};
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
  top: 75%;
  left: 50%;

  ${media.phone`
  top: 65%;
`};
`;

const ChatBoxWrapper = styled.div`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 25rem;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;

  ${media.tablet1`
  top: 20rem;
`};
  ${media.phone`
  top: 12rem;
`};
`;

export default LandingPage;

{
  /* <div id="title-div" onclick="sayHello()"></div>;
function sayHello() {
  console.log("Hello there !!");
} */
}
