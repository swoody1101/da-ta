import React, { useRef, useState } from "react";
import {
  CenterWrapper,
  RowCenterWrapper,
  Wrapper,
} from "./../../styles/Wrapper";
import LetterToggleButton from "./../../components/atoms/letter_write/LetterToggleButton";
import styled from "styled-components";
import Button from "./../../components/atoms/Button";
import BackgroundGradient from "./../../components/atoms/BackgroundGradient";
import { LetterTextArea } from "../../components/atoms/TextArea";
import { ColorTypes } from "./../../constants/Colors";
import { media } from "../../utils/styleUtil";
import { SizeTypes, SIZE_WIDE } from "./../../constants/Sizes";
import { useEffect } from "react";
import LetterProgressBar from "../../components/molecules/letter_write/LetterProgressBar";
import Input from "./../../components/atoms/Input";
import LetterOptionBox from "../../components/organisms/LetterOptionBox";
import { MAX_CHAR_COUNT, MIN_CHAR_COUNT } from "./../../constants/Variables";
import { debounce } from "../../utils/optimizationUtil";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LetterOptions } from "../../constants/Options";

const LetterWritePage = () => {
  const [options, setOptions] = useState({
    paper: LetterOptions.PAPERS[0],
    font: LetterOptions.FONTS[0],
    age: LetterOptions.AGES[0],
    allowReply: false,
  });

  const [act, setAct] = useState(true); // [편지지,도화지] 토글
  const [optionToggle, setOptionToggle] = useState(false); // 옵션창 토글
  const [charCount, setCharCount] = useState(0); // 편지 글자 수
  const [charCountWarning, setCharCountWarning] = useState(true); // 글자수 미만 또는 초과로 인한 경고 표시
  const [sizeX, setSizeX] = useState(window.innerWidth); // 브라우저 너비 측정
  const titleInput = useRef(); // 제목 ref (값 가져오기, focus)
  const contentInput = useRef(); // 내용 ref (값 가져오기, ref)

  /**
   * @description 편지지 텍스트 입력 시 이벤트
   * @param {number} length
   */
  const handleLetterWrite = (length) => {
    debounce(() => {
      setCharCount(length);
    }, 60);
  };

  /**
   * @description "지우기" 버튼 클릭 시 내용 지우는 이벤트
   */
  const handleDeleteContent = () => {
    contentInput.current.value = "";
  };

  /**
   * @description 화면크기 재조정시 이벤트, 편지지 옵션창 display 조정
   */
  const handleResize = () => {
    debounce(() => {
      console.log(window.innerWidth);
      setSizeX(window.innerWidth);
    }, 100);
  };

  useEffect(() => {
    console.log(sizeX);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    charCount < MIN_CHAR_COUNT || charCount > MAX_CHAR_COUNT
      ? setCharCountWarning(true)
      : setCharCountWarning(false);
  }, [charCount]);

  useEffect(() => {
    console.log(options);
  }, [options]);

  return (
    <>
      <BackgroundGradient start={"E2AAFD"} end={"FFDFC2"} />
      <RowCenterWrapper>
        <ContentBlock
          margin={SizeTypes.PC_LETTER_MARGIN}
          mWidth={SizeTypes.MOBILE_LETTER_WIDTH}
          optionToggle={optionToggle}
        >
          <LetterToggleButton
            category="write"
            act={act}
            setAct={!optionToggle && setAct}
            width="50%"
          >
            편지지
          </LetterToggleButton>
          <LetterToggleButton
            category="draw"
            act={act}
            setAct={!optionToggle && setAct}
            width="50%"
          >
            도화지
          </LetterToggleButton>
        </ContentBlock>
        <ContentBlock
          mWidth={SizeTypes.MOBILE_LETTER_WIDTH}
          optionToggle={optionToggle}
        >
          <Spacer act={act} />
        </ContentBlock>
        <ContentBlock
          height={SizeTypes.PC_LETTER_HEIGHT}
          mWidth={SizeTypes.MOBILE_LETTER_WIDTH}
          mHeight={SizeTypes.MOBILE_LETTER_HEIGHT}
          flexDirection="column"
          optionToggle={optionToggle}
        >
          <LetterImg
            src={`${process.env.PUBLIC_URL}/assets/images/letter/${options.paper}.png`}
          />
          {act ? (
            <>
              <Input
                width="96%"
                height={SizeTypes.PC_TITLE_HEIGHT}
                fontSize="1.2rem"
                fontWeight="bold"
                padding="0.5rem 0 0.5rem 0"
                borderShow={false}
                placeholder="제목"
                myRef={titleInput}
              />
              <LetterTextArea
                fontFamily={options.font}
                onChange={(e) => handleLetterWrite(e.target.value.length)}
                placeholder="내용"
                ref={contentInput}
              />
              <LetterProgressBar
                charCount={charCount}
                charCountWarning={charCountWarning}
              />
            </>
          ) : (
            <>
              <h1 style={{ backgroundColor: "black" }}>도화지 들어갈 부분</h1>
            </>
          )}
        </ContentBlock>
        <ContentBlock
          height="5rem"
          alignItems="center"
          justifyContent="space-between"
          mWidth={SizeTypes.MOBILE_LETTER_WIDTH}
          optionToggle={optionToggle}
        >
          <Button
            hoverBgOpacity="0.2"
            fontSize="1.2rem"
            height="3rem"
            width="8rem"
            margin="0 0 0 8%"
            shadow={true}
            onClick={() => handleDeleteContent()}
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
            onClick={() => contentInput.current.focus()}
          >
            보내기
          </Button>
        </ContentBlock>
        <LetterOptionBox
          optionToggle={optionToggle}
          sizeX={sizeX}
          options={options}
          setOptions={setOptions}
        />
        <OptionToggleButton
          bgOpacity="0.3"
          hoverBgOpacity="0.5"
          height="4.5rem"
          width="4.5rem"
          padding="1rem"
          shadow={true}
          borderRadius="100%"
          optionToggle={optionToggle}
          sizeX={sizeX}
          onClick={() => setOptionToggle(!optionToggle)}
        >
          <FontAwesomeIcon icon={faGear} size="2x" />
        </OptionToggleButton>
      </RowCenterWrapper>
    </>
  );
};

const ContentBlock = styled.div`
  display: flex;
  opacity: ${(props) => (props.optionToggle ? "0" : "1")};
  visibility: ${(props) => (props.optionToggle ? "hidden" : "visible")};
  position: relative;
  flex-direction: ${(props) => props.flexDirection || "row"};
  width: ${SizeTypes.PC_LETTER_WIDTH};
  height: ${(props) => props.height};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  margin: ${(props) => props.margin};
  transition: 0.25s ease;

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

const OptionToggleButton = styled(Button)`
  display: ${(props) => (props.sizeX > SIZE_WIDE ? "none" : "flex")};
  position: absolute;
  bottom: 50%;
  right: 1%;
  z-index: 30;
`;

export default LetterWritePage;
