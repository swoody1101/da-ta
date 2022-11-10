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
import { QuestionTextArea } from "../../components/atoms/TextArea";
import QuestionProgressBar from "../../components/molecules/landing/QuestionProgressBar";

const LandingPage = () => {
  const navigate = useNavigate();

  const [chatboxVisible, setChatBoxVisible] = useState(false); // 물병 클릭시 뜨는 말풍선 토글

  const [charCount, setCharCount] = useState(0); // 오늘의 질문 답변 글자 수
  const [charCountWarning, setCharCountWarning] = useState(false); // 글자수 미만 또는 초과로 인한 경고 표시

  const [modalToggleA, setModalToggleA] = useState(false); // 답변보내기 모달창 토글
  const [modalToggleB, setModalToggleB] = useState(false); // 답변리스트 보기 모달창 토글

  const isLogin = useRecoilValue(loginState);

  /**
   * @description chatbox visible event
   */
  const handleChatboxVisible = () => {
    setChatBoxVisible(!chatboxVisible);
  };

  /** [오늘의질문] 답변 입력창 열기 */
  const handleModalA = () => {
    setModalToggleA(true);
  };

  /** [오늘의질문] 답변 모음창 열기 */
  const handleModalB = () => {
    setModalToggleB(true);
  };

  /**
   * @description 물병 던지기 Button의 isLogin 확인 및 navigate
   */
  const HandleIsLoginCheck = () => {
    return isLogin
      ? navigate("/write")
      : { ...popWarningAlert("", "로그인 후 이용해주세요.") };
  };

  //소개글 animation 효과 변경용 AOS
  useEffect(() => {
    AOS.init({ duration: 500, easing: "ease-in-out-back" });
  });

  return (
    <>
      {modalToggleA && (
        <Modal
          width="50%"
          height="50%"
          modalToggle={modalToggleA}
          setModalToggle={setModalToggleA}
          titleText={"오늘의질문"}
        >
          {/* <MainText>오늘의 질문 api 연결 예정</MainText> */}
          <AnswerBox width="80%" height="65%" margin="0 0 0 0">
            <QuestionTextArea
              onChange={(e) => handleQuestionAnswerWrite(e.target.value.length)}
              placeholder="내용"
            />
            <QuestionProgressBar
              charCount={charCount}
              charCountWarning={charCountWarning}
            />
          </AnswerBox>

          <ButtonBox>
            <Button
              margin="9rem 0 0 0"
              fontSize="1.2rem"
              height="3rem"
              width="9rem"
              shadow={true}
              color="#5F0EB0"
              borderStyle="2px solid #5F0EB0"
              hasBorder={false}
              onClick={() => handleAnswerSend()}
            >
              답변 보내기
            </Button>
          </ButtonBox>
        </Modal>
      )}
      {modalToggleB && (
        <Modal
          modalToggle={modalToggleB}
          setModalToggle={setModalToggleB}
          titleText={"오늘의 질문 답변 모음"}
        >
          {/* <MainText>오늘의 질문 api 연결 예정</MainText> */}
          <AnswerBox width="70%" height="50%" margin="0 0 2rem 0">
            <QuestionTextArea
              // onChange={(e) => handleQuestionAnswerWrite(e.target.value.length)}
              placeholder="내용"
            />
          </AnswerBox>
        </Modal>
      )}

      {/* 여기는 현재 answerListModal만 있는 곳 */}

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
        <BottleOfLetterBtn
          onClick={() => handleChatboxVisible(!chatboxVisible)}
        ></BottleOfLetterBtn>
      </BottleWrapper>

      {chatboxVisible ? (
        <ChatBoxWrapper>
          <ChatBoxGroup
            handleModalA={handleModalA}
            handleModalB={handleModalB}
          ></ChatBoxGroup>
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
  top: 3rem;
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

const AnswerBox = styled.div`
  display: flex;
  background-color: none;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  filter: ${(props) =>
    props.shadow ? "drop-shadow(4px 8px 12px rgba(38,38,38,0.5))" : ""};
  cursor: pointer;
  border: ${(props) =>
    props.hasBorder ? "2px solid black" : props.borderStyle};
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.color || "black"};
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  z-index: ${(props) => props.zIndex};

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: all 0.2s ease-in;

  ${media.phone`
           width: ${(props) => (props.mWidth ? props.mWidth : props.width)};
       `}
`;

const ButtonBox = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default LandingPage;

{
  /* <div id="title-div" onclick="sayHello()"></div>;
function sayHello() {
  console.log("Hello there !!");
} */
}
