/**
 * @author chaeyoon
 */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../atoms/Button";
import { media } from "../../../utils/styleUtil";
import { MainTestText } from "../../atoms/Text";
import { loginState } from "../../../recoil/Atoms";
import { popWarningAlert } from "../../../utils/sweetAlert";
import { useRecoilValue } from "recoil";
import { getTodayQuestion } from "../../../api/questionReadAPI";

const ChatBoxGroup = ({
  children,
  onClick,
  handleModalA,
  handleModalB,
  ...props
}) => {
  {
    const isLogin = useRecoilValue(loginState);
    const [todayQuestionQ, setTodayQuestionQ] = useState([]); //변하는 오늘의 질문

    const handlerClickModalA = () => {
      return isLogin
        ? handleModalA()
        : { ...popWarningAlert("", "로그인 후 이용해주세요.") };
    };

    const handlerClickModalB = () => {
      return isLogin
        ? handleModalB()
        : { ...popWarningAlert("", "로그인 후 이용해주세요.") };
    };

    // 오늘의 질문 가져오는 api용 1
    useEffect(() => {
      mainGetQuestion();
    }, []);

    // 오늘의 질문 가져오는 api용 2
    const mainGetQuestion = async () => {
      let response = await getTodayQuestion();
      const todayQuestion = response.data;
      setTodayQuestionQ(todayQuestion);
    };

    return (
      <>
        <ChatBoxMolecure {...props} onClick={onClick}>
          {children}
          <TextBox>
            <MainTestText fontWeight="500">
              {todayQuestionQ.question}
            </MainTestText>
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
              hoverBgOpacity="0.25"
              onClick={() => handlerClickModalA()}
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
              hoverBgOpacity="0.25"
              onClick={() => handlerClickModalB()}
            >
              다른 답변보기
            </Button>
          </ButtonBox>
        </ChatBoxMolecure>
      </>
    );
  }
};

const ChatBoxMolecure = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  width: 440px;
  height: 200px;
  padding: 0.1rem;
  background: #ffffff;
  border-radius: 16px;

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

  ${media.phone`
    width: 90vw;
  `};
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
