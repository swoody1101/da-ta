import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../styles/slick.css";
import "../../styles/slick-theme.css";
import { media } from "../../utils/styleUtil";

import {
  popWarningAlert,
  popErrorAlert,
  popSuccessAlert,
} from "./../../utils/sweetAlert";
import { useRecoilValue } from "recoil";
import { loginState } from "./../../recoil/Atoms";

import Footer from "../../components/molecules/Footer";
import MainSeaGradient from "../../components/atoms/MainSeaGradient";
import { MainWave2 } from "../../components/atoms/MainWave2";
import { MainText, MainSmallText } from "../../components/atoms/Text";

import ScrollToTop from "react-scroll-to-top";
import Button from "./../../components/atoms/Button";
import { SizeTypes } from "./../../constants/Sizes";
import BackgroundGradient from "../../components/atoms/BackgroundGradient";
import MouseScrollDownArrowGroup from "../../components/molecules/MouseScrollDownArrowGroup";

import ChatBoxGroup from "../../components/molecules/landing/ChatBoxGroup";
import BottleOfLetterBtn from "../../components/atoms/BottleOfLetterBtn";

import Modal from "../../components/organisms/Modal";
import { QuestionTextArea } from "../../components/atoms/TextArea";
import QuestionProgressBar from "../../components/molecules/landing/QuestionProgressBar";
import { MIN_CHAR_COUNT_Q, MAX_CHAR_COUNT_Q } from "../../constants/Variables";

import { saveTextAnswer } from "../../api/questionWriteAPI";
import { getLetterNum } from "../../api/letterCountAPI";
import { MainAnimationText } from "../../components/atoms/MainAnimationText";
import { userState } from "./../../recoil/Atoms";
import {
  getTodayQuestion,
  getTodayAnswerList,
} from "../../api/questionReadAPI";
import TranslucentBackground from "./../../components/atoms/TranslucentBackground";
import Title from "../../components/atoms/Title";
import Slider from "react-slick";
import SlickArrow from "../../components/atoms/landing/SlickArrow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import ReportAnswerModal from "../../components/organisms/ReportAnswerModal";

const LandingPage = () => {
  const navigate = useNavigate();

  const [chatboxVisible, setChatBoxVisible] = useState(false); // 물병 클릭시 뜨는 말풍선 토글

  const [charCount, setCharCount] = useState(0); // 오늘의 질문 답변 글자 수

  const [modalToggleA, setModalToggleA] = useState(false); // 답변보내기 모달창 토글
  const [modalToggleB, setModalToggleB] = useState(false); // 답변리스트 보기 모달창 토글

  const [todayQuestionInfo, setTodayQuestionInfo] = useState({}); // 오늘의 질문 정보 (날짜, 내용, id)
  const [answerList, setAnswerList] = useState([]); // 오늘의 질문 답변 리스트
  const [letterCountNum, setLetterCountNum] = useState(0); // 바다에 떠 있는 편지 개수
  const [clickPosY, setClickPosY] = useState(0); // 병 클릭한 마우스 Y좌표
  const [currentAnswerId, setCurrentAnswerId] = useState(0);

  const isLogin = useRecoilValue(loginState); // Recoil 로그인 정보
  const user = useRecoilValue(userState); // Recoil 유저 정보
  const [reportModalToggle, setReportModalToggle] = useState(false);

  const contentInput = useRef(); // 오늘의질문 답변 작성 내용 ref (값 가져오기, ref)

  useEffect(() => {
    AOS.init({ duration: 500, easing: "ease-in-out-back" }); //소개글 animation 효과 변경용 AOS
    mainGetLetterNum();
    mainGetQuestion();
    setChatBoxVisible(false);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (todayQuestionInfo.todayQuestionId === undefined) return;
    mainGetAnswerList(todayQuestionInfo.todayQuestionId);
  }, [todayQuestionInfo.todayQuestionId]);

  useEffect(() => {
    let seq = Math.floor(Math.random() * answerList.length);
    console.log("answerlist length : " + answerList.length);
    console.log("seq : " + seq);
    setCurrentAnswerId(seq);
  }, [answerList]);

  /**
   * @description 답변 작성 모달 open 시 글자 수 초기화
   */
  useEffect(() => {
    setCharCount(0);
  }, [modalToggleA]);

  /**
   * @description 유리병 클릭 좌표 설정 시 말풍선 visible
   */
  useEffect(() => {
    setChatBoxVisible(true);
  }, [clickPosY]);

  /**
   * @description 유리병 클릭 시 클릭한 좌표 설정
   */
  const handleClickBottle = (e) => {
    setClickPosY(e.clientY);
  };

  /**
   * @description [오늘의질문] 답변 입력창 열기
   * */
  const handleModalA = () => {
    if (todayQuestionInfo.todayQuestionId >= 0) {
      setChatBoxVisible(false);
      setModalToggleA(true);
    } else {
      popWarningAlert("", "등록된 질문이 없습니다.");
    }
  };

  /**
   * @description [오늘의질문] 답변 모음창 열기
   * */
  const handleModalB = () => {
    if (answerList.length > 0) {
      setChatBoxVisible(false);
      setModalToggleB(true);
    } else {
      popWarningAlert("", "등록된 답변 목록이 없습니다.");
    }
  };

  /**
   * @description 메인 하단의 물병 던지기 Button의 isLogin 확인 및 navigate
   */
  const handleIsLoginCheck = () => {
    return isLogin
      ? navigate("/write")
      : popWarningAlert("", "로그인 후 이용해주세요.");
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
      user.userId,
      todayQuestionInfo.todayQuestionId
    );

    if (!response || (response.status !== 200 && response.status !== 201)) {
      popErrorAlert("답변 전송 오류", "답변 전송 중 오류가 발생했습니다.");
      return;
    }

    setModalToggleA(false);
    setModalToggleB(false);
    setChatBoxVisible(false);
    setCharCount(0);
    mainGetAnswerList(todayQuestionInfo.todayQuestionId);
    popSuccessAlert("답변 전송 완료", "오늘의 질문 답변이 전송되었습니다.");
  };

  /**
   * @description 바다에 띄워진 편지 개수 호출
   */
  const mainGetLetterNum = async () => {
    const response = await getLetterNum();
    if (!response || (response.status !== 200 && response.status !== 201)) {
      setLetterCountNum("-");
      return;
    }
    setLetterCountNum(response.data.letterCount);
  };

  /**
   * @description 오늘의 질문 조회 및 저장
   */
  const mainGetQuestion = async () => {
    const response = await getTodayQuestion();
    if (!response || (response.status !== 200 && response.status !== 201)) {
      setTodayQuestionInfo({
        questionId: -1,
        question: "등록된 질문이 없습니다.",
        date: new Date(),
      });
      return;
    }
    setTodayQuestionInfo(response.data);
  };

  /**
   * @description 오늘의 질문 답변 리스트 조회 및 저장
   */
  const mainGetAnswerList = async (qId) => {
    const response = await getTodayAnswerList(qId);
    if (!response || (response.status !== 200 && response.status !== 201)) {
      setAnswerList([]);
      return;
    }
    setAnswerList(response.data);
  };

  /**
   * @description 오늘의 질문 답변 신고
   */
  const handleReportAnswer = async () => {
    setModalToggleB(false);
    setReportModalToggle(true);
  };

  return (
    <>
      {/* 파도 위 바다 배경 Gradient */}
      <BackgroundGradient start={"E2AAFD"} end={"FFDFC2"} />

      {/* 파도 아래 바다 배경 Gradient */}
      <MainSeaGradient />

      {/* 떠 있는 물병 */}
      <BottleOfLetterBtn onClick={(e) => handleClickBottle(e)} />

      {/* 물병 클릭 시 떠 있는 투명 배경 */}
      {clickPosY > 10 && chatboxVisible && (
        <TranslucentBackground
          bgColor={"transparent"}
          onClick={() => setChatBoxVisible(false)}
        />
      )}

      {/* 물병 클릭 시 나타나는 말풍선 */}
      {clickPosY > 10 && chatboxVisible && (
        <ChatBoxWrapper clickPosY={clickPosY} chatboxVisible={chatboxVisible}>
          <ChatBoxGroup
            handleModalA={handleModalA}
            handleModalB={handleModalB}
            todayQuestion={todayQuestionInfo.question}
          />
        </ChatBoxWrapper>
      )}

      {/* 오늘의질문 답변 신고 모달 */}
      {reportModalToggle && (
        <ReportAnswerModal
          modalToggle={reportModalToggle}
          setModalToggle={setReportModalToggle}
          answerId={currentAnswerId}
        />
      )}

      {/* 오늘의질문 답변 작성하는 모달 */}
      {modalToggleA && (
        <Modal
          width="440px"
          height="440px"
          modalToggle={modalToggleA}
          setModalToggle={setModalToggleA}
          titleText={"질문 답변"}
          flexDirection={"column"}
        >
          <Title fontSize="1rem" color="#383838">
            Q. {todayQuestionInfo.question}
          </Title>
          <AnswerBox width="90%" height="40%" margin="2rem 0 2rem 0">
            <QuestionTextArea
              onChange={(e) => handleQuestionAnswerWrite(e.target.value.length)}
              placeholder="답변을 입력해주세요."
              ref={contentInput}
            />
            <QuestionProgressBar charCount={charCount} />
          </AnswerBox>
          <ButtonBox>
            <Button
              margin="0 0 0.25rem 0"
              fontSize="1.1rem"
              height="3rem"
              width="9rem"
              shadow={true}
              color="#5F0EB0"
              borderStyle="2px solid #5F0EB0"
              hoverBgOpacity="0.25"
              hasBorder={false}
              onClick={() => handleAnswerSend()}
            >
              답변 보내기
            </Button>
          </ButtonBox>
        </Modal>
      )}

      {/* '다른 답변 보기' 클릭 시 나타나는 모달 */}
      {modalToggleB && (
        <Modal
          width="440px"
          height="440px"
          modalToggle={modalToggleB}
          setModalToggle={setModalToggleB}
          titleText={"답변 목록"}
          flexDirection={"column"}
        >
          <Title fontSize="1.1rem" color="#383838">
            Q. {todayQuestionInfo.question}
          </Title>
          <AnswerBox width="95%" height="75%" margin="1rem 0 0 0">
            <QuestionAnswerListArea>
              <AnswerReportButton onClick={handleReportAnswer}>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  style={{
                    color: "#F44336",
                  }}
                  size="2x"
                />
              </AnswerReportButton>
              <StyledSlider
                dots={false}
                infinite={false}
                speed={150}
                slidesToShow={1}
                slidesToScroll={1}
                prevArrow={<SlickArrow direction={"prev"} />}
                nextArrow={<SlickArrow direction={"next"} />}
                initialSlide={currentAnswerId}
                afterChange={(index) => {
                  setCurrentAnswerId(answerList[index].todayAnswerId);
                }}
              >
                {answerList.map((item, index) => (
                  <SliderContent key={index}>{item.answer}</SliderContent>
                ))}
              </StyledSlider>
            </QuestionAnswerListArea>
          </AnswerBox>
        </Modal>
      )}

      {/* 스크롤 내릴 시 나타나는 문구들 */}
      <TextWrapper>
        <MainSmallText
          margin="calc(6rem + 5vh) 0 0 0"
          data-aos-duration="500"
          data-aos="flip-up"
        >
          {letterCountNum}개의 편지가 바다에 떠 있습니다
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
            DA-TA에서는 익명으로 <br />
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
            onClick={() => handleIsLoginCheck()}
          >
            💌 &nbsp; 물병 던지기 &nbsp; 💌
          </Button>
        </div>
      </TextWrapper>

      {/* 아래 스크롤 안내 arrow */}
      <MouseScrollDownArrowWrapper>
        <MouseScrollDownArrowGroup />
      </MouseScrollDownArrowWrapper>

      {/* 파도 모음 */}
      <MainWave2 opacity={0.4} frequency={16} isRight={false} zIndex="5" />
      <MainWave2 opacity={0.6} frequency={13} isRight={false} zIndex="6" />
      <MainWave2 opacity={0.6} frequency={20} isRight={false} zIndex="3" />
      <MainWave2 opacity={0.6} frequency={20} isRight={true} zIndex="8" />
      <MainWave2 opacity={0.4} frequency={16} isRight={true} zIndex="1" />
      <MainWave2 opacity={0.3} frequency={13} isRight={true} zIndex="2" />
      <MainWave2 opacity={0.7} frequency={20} isRight={true} zIndex="4" />

      {/* 맨 위로 버튼 */}
      <ScrollToTop
        smooth
        color="#ffffff"
        strokeWidth="px"
        style={{
          backgroundColor: "rgba( 255, 255, 255, 0.4 )",
          borderRadius: "100%",
          border: "4px solid #ffffff",
          width: "4rem",
          height: "4rem",
          margin: "0 1% 1% 0",
          // strokeWidth: "7",
        }}
      />

      {/* 푸터 */}
      <Footer />
    </>
  );
};

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
  z-index: 10;
  bottom: 20vh;
  left: 50%;
  background-color: yellow;
  opacity: 0.7;

  ${media.phone`
  	top: 65%;
	`};
`;

const ChatBoxWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: calc(${(props) => props.clickPosY}px - 180px);
  left: 50%;
  z-index: 1001;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transform: ${(props) => (props.chatboxVisible ? `scaleY(1)` : `scaleY(0)`)};
  transition: 3s ease;
  transition-delay: 5s;

  ${media.tablet1`
  top: 20rem;
`};
  ${media.phone`
  top: 12rem;
`};
`;

const AnswerBox = styled.div`
  display: flex;
  background-color: transparent;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  filter: ${(props) =>
    props.shadow ? "drop-shadow(4px 8px 12px rgba(38,38,38,0.5))" : ""};
  border: ${(props) =>
    props.hasBorder ? "2px solid black" : props.borderStyle};
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.color || "black"};
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  z-index: ${(props) => props.zIndex};

  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);

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
  bottom: 1rem;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const QuestionAnswerListArea = styled.div`
	display: flex;
	resize: none;
	align-items: center;
	justify-content: center;
	text-align; center;
	width: 100%;
	height: 100%;
	padding: 0rem;
	box-sizing: border-box;
	background: transparent;
	font-size: 1rem;
	line-height: 1.5rem;
	color: black;
`;

const StyledSlider = styled(Slider)`
  display: flex;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  width: 100%;
  height: 90%;
  padding: 0.5rem;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  text-align: center;

  .slack-list {
    width: 100%;
    margin: 0 auto;
  }
`;

const SliderContent = styled.div`
  display: flex;
  width: 80%;
  height: auto;
  padding: 0rem;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1rem;
  white-space: normal;
  word-wrap: break-all;
  word-break: break-all;
`;

const AnswerReportButton = styled.button`
  display: flex;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  background: transparent;
  z-index: 500;
`;

export default LandingPage;
