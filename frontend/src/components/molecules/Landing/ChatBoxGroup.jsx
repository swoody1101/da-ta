/**
 * @author chaeyoon
 */
import React from "react";
import styled from "styled-components";
import Button from "../../atoms/Button";
import Modal from "../../organisms/Modal";
import { media } from "../../../utils/styleUtil";
import { QuestionTextArea } from "../../atoms/TextArea";
import { MainTestText } from "../../atoms/Text";
import QuestionProgressBar from "./QuestionProgressBar";
import { loginState } from "../../../recoil/Atoms";

//isLogin 여부 관련 import 요소들
import { popWarningAlert } from "../../../utils/sweetAlert";
import { useRecoilValue } from "recoil";

const ChatBoxGroup = ({
  children,
  onClick,
  handleModalA,
  handleModalB,
  ...props
}) => {
  {
    const isLogin = useRecoilValue(loginState);

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

    return (
      <>
        <ChatBoxMolecure {...props} onClick={onClick}>
          {children}
          <TextBox>
            <MainTestText fontWeight="500">오늘의 질문 연결 예정</MainTestText>
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
