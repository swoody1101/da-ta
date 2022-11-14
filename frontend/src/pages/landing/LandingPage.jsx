import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { media } from "../../utils/styleUtil";

import {
  popWarningAlert,
  popErrorAlert,
  popSuccessAlert,
} from "./../../utils/sweetAlert";
import { useRecoilValue, useRecoilState } from "recoil";
import { loginState } from "./../../recoil/Atoms";

import Footer from "../../components/molecules/Footer";
import MainSeaGradient from "../../components/atoms/MainSeaGradient";
import { MainWave2 } from "../../components/atoms/MainWave2";
import { MainText, MainSmallText } from "../../components/atoms/Text";

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
import { MIN_CHAR_COUNT_Q, MAX_CHAR_COUNT_Q } from "../../constants/Variables";

import { saveTextAnswer } from "../../api/questionWriteAPI";
import { getLetterNum } from "../../api/letterCountAPI";
import { MainAnimationText } from "../../components/atoms/MainAnimationText";
import { useSetRecoilState } from "recoil";
import {
  todayQuestionState,
  userState,
  todayAnswerState,
} from "./../../recoil/Atoms";
import {
  getTodayQuestion,
  getTodayAnswerList,
} from "../../api/questionReadAPI";

const LandingPage = () => {
  const navigate = useNavigate();

  const [chatboxVisible, setChatBoxVisible] = useState(false); // 물병 클릭시 뜨는 말풍선 토글

  const [charCount, setCharCount] = useState(0); // 오늘의 질문 답변 글자 수
  const [charCountWarning, setCharCountWarning] = useState(false); // 글자수 미만 또는 초과로 인한 경고 표시

  const [modalToggleA, setModalToggleA] = useState(false); // 답변보내기 모달창 토글
  const [modalToggleB, setModalToggleB] = useState(false); // 답변리스트 보기 모달창 토글

  const setTodayQuestion = useSetRecoilState(todayQuestionState);
  const setTodayAnswer = useSetRecoilState(todayAnswerState);

  const user = useRecoilValue(userState); //유저 id 값 용
  const todayQuestion = useRecoilValue(todayQuestionState); //오늘의 질문 id 값 용
  const isLogin = useRecoilValue(loginState);
  const todayAnswer = useRecoilValue(todayAnswerState);

  const contentInput = useRef(); // 내용 ref (값 가져오기, ref)
  const unshowRef = useRef([]); // 보내기 버튼 누를 시 사라질 영역들 ref

  const [letterCountNum, setLetterCountNum] = useState([]); //변하는 편지 전체 수
  const [todayQuestionQ, setTodayQuestionQ] = useState([]); //오늘의 질문 1
  const [todayAnswerA, setTodayAnswerA] = useState([]); //오늘의 질문 관련 데이터 뽑아내기 용도

  const [answers, setAnswers] = useState([]); //답변 리스트 뽑아내는 용도

  const realUserId = user.userId;
  const realTodayQuestionId = todayQuestion.todayQuestionId;
  /**
   * @description 물병 누를 경우 chatbox visible
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
   * @description 메인 하단의 물병 던지기 Button의 isLogin 확인 및 navigate
   */
  const HandleIsLoginCheck = () => {
    return isLogin
      ? navigate("/write")
      : { ...popWarningAlert("", "로그인 후 이용해주세요.") };
  };

  /**
   * @description 오늘의 질문 답변 입력 시 이벤트
   * @param {number} length
   */
  const handleQuestionAnswerWrite = (length) => {
    setCharCount(length);
  };

  /**
   * @description "보내기" 버튼 눌렀을 시 이벤트
   */
  const handleAnswerSend = async () => {
    //유효성 검사
    const content = contentInput.current.value;
    if (content.length < MIN_CHAR_COUNT_Q) {
      popWarningAlert(`답변 내용을 ${MIN_CHAR_COUNT_Q}자 이상 입력해주세요.`);
      return;
    } else if (content.length > MAX_CHAR_COUNT_Q) {
      popWarningAlert(`답변 내용을 ${MAX_CHAR_COUNT_Q}자 이하 입력해주세요.`);
      return;
    }

    const response = await saveTextAnswer(
      content,
      realUserId,
      realTodayQuestionId
    );

    if (response.status < 200 && response.status >= 300) {
      popErrorAlert("답변 전송 오류", "답변 전송 중 오류가 발생했습니다.");
      return;
    } else if (response.status >= 200 && response.status < 300) {
      popSuccessAlert("답변 전송 완료", "오늘의 질문 답변이 전송되었습니다.");
      return;
    }
  };

  useEffect(() => {
    AOS.init({ duration: 500, easing: "ease-in-out-back" }); //소개글 animation 효과 변경용 AOS
  });

  useEffect(() => {
    mainGetLetterNum();
    mainGetQuestion();
    mainGetAnswer();
  }, []);

  //오늘의 질문 답변보내기 입력때 사용하는 글자 수 카운트
  useEffect(() => {
    setCharCount(0);
  }, [true]);

  // 바다에 띄워진 물병 편지 전체 개수 가져오는 api용 2
  const mainGetLetterNum = async () => {
    let response = await getLetterNum();
    if (!response || (response.status < 200 && response.status >= 300)) {
      popErrorAlert("답변 전송 오류", "답변 전송 중 오류가 발생했습니다.");
      return;
    }
    const letternum = response.data;
    setLetterCountNum(letternum);
  };

  // 오늘의 질문 가져오는 api용 2
  const mainGetQuestion = async () => {
    let response = await getTodayQuestion();
    if (!response || (response.status < 200 && response.status >= 300)) {
      popErrorAlert("답변 전송 오류", "답변 전송 중 오류가 발생했습니다.");
      return;
    }
    const todayQuestions = response.data;
    setTodayQuestionQ(todayQuestions);
    setTodayQuestion(todayQuestions);
  };

  // 오늘의 질문 답변 가져오는 api용 2
  const mainGetAnswer = async () => {
    let response = await getTodayAnswerList();
    if (!response || (response.status < 200 && response.status >= 300)) {
      popErrorAlert(
        "답변 목록 오류",
        "답변을 받아오는 중에 오류가 발생했습니다."
      );
      return;
    }
    console.log(response);
    console.log("답변가져오는 api");

    const todayAnswers = response.data;

    console.log(todayAnswers.todayAnswerId);
    setTodayAnswer(todayAnswers); //리코일
  };

  return (
    <>
      {modalToggleA && (
        <Modal
          width="50%"
          height="50%"
          modalToggle={modalToggleA}
          setModalToggle={setModalToggleA}
          titleText={todayQuestionQ.question}
        >
          <AnswerBox width="80%" height="65%" margin="0 0 0 0">
            <QuestionTextArea
              onChange={(e) => handleQuestionAnswerWrite(e.target.value.length)}
              placeholder="내용"
              ref={contentInput}
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
          width="50%"
          height="50%"
          modalToggle={modalToggleB}
          setModalToggle={setModalToggleB}
          titleText={"답변 목록"}
        >
          <AnswerBox width="80%" height="70%" margin="2rem 0 0 0">
            <QuestionAnswerListArea>
              {answers.map((answer, userId) => (
                <ContentElement>
                  <hr />
                  <div>{(answer = todayAnswer.answer)}</div>
                  <div>{(userId = todayAnswer.userId)}</div>
                  <hr />
                </ContentElement>
              ))}
            </QuestionAnswerListArea>
          </AnswerBox>
        </Modal>
      )}

      {/* <BackgroundGradient start={"aaa"} end={"aaa"} /> */}
      <BackgroundGradient start={"E2AAFD"} end={"FFDFC2"} />

      <TextWrapper>
        <MainSmallText
          margin="20vh 0 0 0"
          data-aos-duration="500"
          data-aos="flip-up"
        >
          {letterCountNum.letterCount}개의 편지가 바다에 떠 있습니다
        </MainSmallText>
        <MainAnimationText
          mFont_size={SizeTypes.MOBILE_MAIN_TEXT_SIZE}
          margin="8vh 0 0 0"
        >
          안녕하세요! 😏 여기는 '닿다'예요
        </MainAnimationText>

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

const QuestionAnswerListArea = styled.div`
  display: flex;
  resize: none;
  border: 1px solid black;
  border-radius: 1em;
  z-index: 10;
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  background: transparent;
  font-size: 1rem;
  line-height: 1.5rem;
  color: black;

  &:focus {
    outline: none;
  }
`;

export default LandingPage;
