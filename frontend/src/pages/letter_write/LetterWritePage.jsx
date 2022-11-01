import React, { useState } from "react";
import {
  CenterWrapper,
  RowCenterWrapper,
  Wrapper,
} from "./../../styles/Wrapper";
import LetterToggleButton from "./../../components/atoms/letter_write/LetterToggleButton";
import styled from "styled-components";
import Button from "./../../components/atoms/Button";
import BackgroundVideo from "./../../components/atoms/BackgroundVideo";
import BackgroundGradient from "./../../components/atoms/BackgroundGradient";
import { LetterTextArea } from "../../components/atoms/TextArea";
import { ColorTypes } from "./../../constants/Colors";
import { media } from "../../utils/styleUtil";
import { SizeTypes } from "./../../constants/Sizes";
import { useEffect } from "react";
import LetterProgressBar from "../../components/molecules/letter_write/LetterProgressBar";

const LetterWritePage = () => {
  const [act, setAct] = useState(true); // [편지지,도화지] 토글
  const [letterDesign, setLetterDesign] = useState("pink"); // 편지지 디자인 이름
  const [charCount, setCharCount] = useState(0); // 편지 글자 수
  let timer;

  useEffect(() => {
    console.log(charCount);
  }, [charCount]);

  /**
   * @description 편지 입력시 과한 재렌더링을 막기 위한 디바운싱 함수
   * @param {() => void} callback 콜백함수
   * @param {number} delay 딜레이
   */
  const debounce = (callback, delay) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(callback, delay);
  };

  /**
   * @description 편지지 텍스트 입력 시 이벤트
   * @param {number} length
   */
  const handleLetterWrite = (length) => {
    debounce(() => {
      setCharCount(length);
    }, 300);
  };

  return (
    <>
      <BackgroundGradient start={"E2AAFD"} end={"FFDFC2"} />
      <RowCenterWrapper>
        <ContentBlock
          margin={SizeTypes.PC_LETTER_MARGIN}
          mWidth={SizeTypes.MOBILE_LETTER_WIDTH}
        >
          <LetterToggleButton
            category="write"
            act={act}
            setAct={setAct}
            width="50%"
          >
            편지지
          </LetterToggleButton>
          <LetterToggleButton
            category="draw"
            act={act}
            setAct={setAct}
            width="50%"
          >
            도화지
          </LetterToggleButton>
        </ContentBlock>
        <ContentBlock mWidth={SizeTypes.MOBILE_LETTER_WIDTH}>
          <Spacer act={act} />
        </ContentBlock>
        <ContentBlock
          height={SizeTypes.PC_LETTER_HEIGHT}
          mWidth={SizeTypes.MOBILE_LETTER_WIDTH}
          mHeight={SizeTypes.MOBILE_LETTER_HEIGHT}
        >
          <LetterImg
            src={`${process.env.PUBLIC_URL}/assets/images/letter/${letterDesign}.png`}
          />
          <LetterTextArea
            onChange={(e) => handleLetterWrite(e.target.value.length)}
          />
          <LetterProgressBar charCount={charCount} />
        </ContentBlock>
        <ContentBlock
          height="5rem"
          alignItems="center"
          justifyContent="space-between"
          mWidth={SizeTypes.MOBILE_LETTER_WIDTH}
        >
          <Button
            hoverBgOpacity="0.2"
            fontSize="1.2rem"
            height="3rem"
            width="8rem"
            margin="0 0 0 8%"
            shadow={true}
          >
            지우기
          </Button>
          <Button
            hoverBgOpacity="0.2"
            fontSize="1.2rem"
            height="3rem"
            width="8rem"
            margin="0 8% 0 0"
            shadow={true}
          >
            보내기
          </Button>
        </ContentBlock>
      </RowCenterWrapper>
    </>
  );
};

const ContentBlock = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  width: ${SizeTypes.PC_LETTER_WIDTH};
  height: ${(props) => props.height};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  margin: ${(props) => props.margin};

  ${media.phone`
    width: ${(props) => props.mWidth};
    height: calc(${(props) => props.mHeight});
  `}
`;

const LetterImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Spacer = styled.div`
  display: flex;
  width: 100%;
  height: 0.5rem;
  transition: 0.2s ease;
  border-bottom: 1px solid #d9d9d9;
  background-color: ${(props) =>
    props.act ? ColorTypes.LETTER_WRITE_COLOR : ColorTypes.LETTER_DRAW_COLOR};
`;

export default LetterWritePage;
