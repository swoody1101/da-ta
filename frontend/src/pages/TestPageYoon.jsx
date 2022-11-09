import React, { useState } from "react";
import styled from "styled-components";
import BackgroundGradient from "../components/atoms/BackgroundGradient";
import ScrollToTop from "react-scroll-to-top";

import Modal from "../components/organisms/Modal";
import { media } from "../utils/styleUtil";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/Atoms";
import { useNavigate } from "react-router-dom";
import { MainText } from "../components/atoms/Text";
import { QuestionTextArea } from "../components/atoms/TextArea";
import QuestionProgressBar from "../components/molecules/landing/QuestionProgressBar";
import Button from "../components/atoms/Button";

import { MAX_CHAR_COUNT_Q } from "../constants/Variables";

const TestPageYoon = () => {
  const [charCount, setCharCount] = useState(0); // 오늘의 질문 답변 글자 수
  const [charCountWarning, setCharCountWarning] = useState(true); // 글자수 미만 또는 초과로 인한 경고 표시
  const user = useRecoilValue(userState);

  const [modalToggle, setModalToggle] = useState(true); // 편지지 선택 모달창 토글

  /**
   * @description 오늘의 질문 답변(텍스트) 입력 시 이벤트
   * @param {number} length
   */
  const handleQuestionAnswerWrite = (length) => {
    setCharCount(length);
  };

  /**
   * @description "보내기" 버튼 눌렀을 시 이벤트
   */
  const handleAnswerSend = async () => {
    // 답변
    if (act) {
      // 유효성 검사
      const content = contentInput.current.value;
      if (content.length > MAX_CHAR_COUNT) {
        popWarningAlert(`답변 내용을 ${MAX_CHAR_COUNT}자 이하 입력해주세요.`);
        return;
      }
    }

    useEffect(() => {
      setCharCount(0);
    }, []);

    useEffect(() => {
      charCount > MAX_CHAR_COUNT
        ? setCharCountWarning(true)
        : setCharCountWarning(false);
    }, [charCount]);
  };
  return (
    <>
      <BackgroundGradient start={"E2AAFD"} end={"FFDFC2"}></BackgroundGradient>

      <ScrollToTop smooth color="#6f00ff" border="20" />

      <Modal
        width="50%"
        height="40%"
        modalToggle={modalToggle}
        setModalToggle={setModalToggle}
        titleText={"오늘의질문 api 연결"}
      >
        {/* <MainText>오늘의 질문 api 연결 예정</MainText> */}
        <AnswerBox width="70%" height="50%" margin="0 0 2rem 0">
          <QuestionTextArea
            onChange={(e) => handleQuestionAnswerWrite(e.target.value.length)}
            placeholder="내용"
          />
          {/* <QuestionProgressBar
            charCount={charCount}
            charCountWarning={charCountWarning}
          /> */}
        </AnswerBox>

        <ButtonBox>
          <Button
            fontSize="1.2rem"
            height="3rem"
            width="9rem"
            shadow={true}
            color="#5F0EB0"
            borderStyle="2px solid #5F0EB0"
            hasBorder={false}
            onClick={() => handleAnswerSend()}
          >
            쪽지 보내기
          </Button>
        </ButtonBox>
      </Modal>
      {/* <Wave opacity={.4} frequency={13} isRight={false}></Wave> */}
    </>
  );
};

TestPageYoon.defaultProps = {
  bgOpacity: "0",
  fontSize: "1rem",
  height: "2rem",
  margin: "0rem",
  padding: "0rem",
  shadow: false,
  width: "0rem",
  borderRadius: "0.1rem",
  hasBorder: true,
};

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
  top: 88%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default TestPageYoon;
