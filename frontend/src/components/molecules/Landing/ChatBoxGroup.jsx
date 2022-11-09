/**
 * @author chaeyoon
 */
import React, { Component, useState } from "react";
import styled from "styled-components";
import Chatbox from "../../atoms/Chatbox";
import Button from "../../atoms/Button";

import { MainTestText } from "../../atoms/Text";

import Modal from "../../organisms/Modal";

//isLogin 여부 관련 import 요소들

import { popWarningAlert } from "../../../utils/sweetAlert";
import { useRecoilValue } from "recoil";
import { loginState } from "../../../recoil/Atoms";

const ChatBoxGroup = ({ children, onClick, ...props }) => {
  const [answerModalShow, setAnswerModalShow] = useState(false); // 답변 보내는 모달창 show 여부
  const [anotherAnswerModalShow, setAnotherAnswerModalShow] = useState(false); // 타인 답변보기 모달창 show 여부
  // const [chatBoxShow, setChatBoxShow] = useState(false); //chatbox show 여부

  const isLogin = useRecoilValue(loginState);

  const answerModalHandleClick = (event) => {
    return isLogin
      ? setAnswerModalShow((answerModalShow) => !answerModalShow)
      : setAnswerModalShow((answerModalShow) => !answerModalShow);
  };

  // 나중에 작업 끝나면 바꿔끼워넣기

  // const answerModalHandleClick = (event) => {
  //   return isLogin
  //     ? setAnswerModalShow((answerModalShow) => !answerModalShow)
  //     : { ...popWarningAlert("", "로그인 후 이용해주세요.") };
  // };

  const anotherAnswerModalHandleClick = (event) => {
    return isLogin
      ? setAnotherAnswerModalShow(
          (anotherAnswerModalShow) => !anotherAnswerModalShow
        )
      : (anotherAnswerModalShow) => !anotherAnswerModalShow;
  };

  // 나중에 작업 끝나면 바꿔끼워넣기
  // const anotherAnswerModalHandleClick = (event) => {
  //   return isLogin
  //     ? setAnotherAnswerModalShow(
  //         (anotherAnswerModalShow) => !anotherAnswerModalShow
  //       )
  //     : { ...popWarningAlert("", "로그인 후 이용해주세요.")};
  // };

  return (
    <ChatBoxMolecure {...props} onClick={onClick}>
      {children}
      {/* <Chatbox></Chatbox> */}
      <TextBox>
        <MainTestText fontWeight="500">오늘의 질문 list 연결 예정</MainTestText>
      </TextBox>

      <ButtonBox>
        <Button
          fontSize="1.2rem"
          height="3rem"
          width="9rem"
          margin="1% 0 0 2%"
          shadow={true}
          color="#5F0EB0"
          borderStyle="2px solid #5F0EB0"
          hasBorder={false}
          onClick={() => answerModalHandleClick(!answerModalShow)}
        >
          답변하기
        </Button>

        <Button
          fontSize="1.2rem"
          height="3rem"
          width="9rem"
          margin="1% 2% 0 9%"
          shadow={true}
          color="#5F0EB0"
          borderStyle="2px solid #5F0EB0"
          hasBorder={false}
          onClick={() => anotherAnswerModalHandleClick(!anotherAnswerModalShow)}
        >
          다른 답변보기
        </Button>
      </ButtonBox>
    </ChatBoxMolecure>
  );
};

const ChatBoxMolecure = styled(
  styled.div({
    width: "40%",
    minWidth: "300px",
    height: "200px",
    padding: "0px",
    background: "#FFFFFF",
    // -webkit-border-radius: "25px",
    webkitBorderRadius: "25px",
    // -moz-border-radius: "25px",
    mozBorderRadius: "25px",
    // border-radius: "25px",
    borderRadius: "25px",
    display: "flex",
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    alignItems: "center",
  })
)`
  &::after {
    content: "";
    display: flex;
    position: absolute;
    border-style: solid;
    border-width: 34px 17px 0;
    border-color: #ffffff transparent;
    width: 0;
    bottom: -34px;
    left: 46.8%;
  }
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

const TextBox = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ChatBoxGroup;

// import React from "react";
// import { popWarningAlert } from "./../../utils/sweetAlert";

// import { useRecoilValue } from "recoil";
// import { loginState } from "./../../recoil/Atoms";

// const PrivateModalRoute = ({ component: Component }) => {
//   const isLogin = useRecoilValue(loginState);
//   return isLogin
//     ? Component
//     : { ...popWarningAlert("", "로그인 후 이용해주세요.") };
// };

// export default PrivateModalRoute;
