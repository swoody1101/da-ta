/**
 * @author chaeyoon
 */
import React from "react";
import styled from "styled-components";
import { media } from "../../../utils/styleUtil";
import Modal from "../../organisms/Modal";
import { MainText } from "../../atoms/Text";
import Input from "../../atoms/Input";
import { SizeTypes } from "../../../constants/Sizes";
import { QuestionTextArea } from "../../atoms/TextArea";
import LetterProgressBar from "../../components/molecules/letter/LetterProgressBar";
import Button from "../../atoms/Button";

const TodayQuestionAnswerModal = ({}) => {
  const [charCount, setCharCount] = useState(0); // 오늘의 질문 답변 글자 수
  const [charCountWarning, setCharCountWarning] = useState(true); // 오늘의 질문 답변 글자수 미만 또는 초과로 인한 경고 표시

  /**
   * @description 오늘의 질문 답변(텍스트) 입력 시 이벤트
   * @param {number} length
   */
  const handleQuestionAnswerWrite = (length) => {
    setCharCount(length);
  };

  return (
    <Modal>
      <MainText>오늘의 질문 api 연결 예정</MainText>
      <AnswerBox>
        {/* <Input
          width="96%"
          height={SizeTypes.PC_TITLE_HEIGHT}
          fontSize="1.2rem"
          fontWeight="bold"
          padding="0.5rem 0 0.5rem 0"
          borderShow={false}
          placeholder="제목"
          myRef={titleInput}
        /> */}
        <QuestionTextArea
          onChange={(e) => handleQuestionAnswerWrite(e.target.value.length)}
          placeholder="내용"
          ref={contentInput}
        />
        <LetterProgressBar
          charCount={charCount}
          charCountWarning={charCountWarning}
        />
      </AnswerBox>

      <ButtonBox>
        <Button
          fontSize="1.2rem"
          height="3rem"
          width="9rem"
          margin="1% 2% 0 9%"
          shadow={true}
          color="#5F0EB0"
          borderStyle="2px solid #5F0EB0"
          hasBorder={false}
        >
          쪽지 보내기
        </Button>
      </ButtonBox>
    </Modal>
  );
};

TodayQuestionAnswerModal.defaultProps = {
  bgOpacity: "0",
  hoverBgOpacity: "0",
  fontSize: "1rem",
  height: "2rem",
  margin: "0rem",
  padding: "0rem",
  shadow: false,
  width: "4rem",
  borderRadius: "0.5rem",
  hasBorder: true,
};

const AnswerBox = styled.div`
  display: flex;
  background-color: rgba(217, 217, 217, ${(props) => props.bgOpacity});
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  filter: ${(props) =>
    props.shadow ? "drop-shadow(4px 8px 12px rgba(38,38,38,0.5))" : ""};
  cursor: pointer;
  border: ${(props) =>
    props.hasBorder ? "2px solid white" : props.borderStyle};
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.color || "white"};
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  z-index: ${(props) => props.zIndex};

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

export default TodayQuestionAnswerModal;
