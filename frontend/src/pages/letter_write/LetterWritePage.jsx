import React, { useRef, useState } from "react";
import {
  CenterWrapper,
  RowCenterWrapper,
  Wrapper,
} from "./../../styles/Wrapper";
import LetterToggleButton from "./../../components/atoms/letter/LetterToggleButton";
import styled from "styled-components";
import Button from "./../../components/atoms/Button";
import BackgroundGradient from "./../../components/atoms/BackgroundGradient";
import { LetterTextArea } from "../../components/atoms/TextArea";
import { ColorTypes } from "./../../constants/Colors";
import { media } from "../../utils/styleUtil";
import { SizeTypes, SIZE_WIDE } from "./../../constants/Sizes";
import { useEffect } from "react";
import LetterProgressBar from "../../components/molecules/letter/LetterProgressBar";
import Input from "./../../components/atoms/Input";
import LetterOptionBox from "../../components/organisms/LetterOptionBox";
import { MAX_CHAR_COUNT, MIN_CHAR_COUNT } from "./../../constants/Variables";
import { debounce } from "../../utils/optimizationUtil";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LetterOptions } from "../../constants/Options";
import Modal from "./../../components/organisms/Modal";
import LetterDesignChoice from "../../components/molecules/letter/LetterDesignChoice";
import ContentBlock from "./../../components/atoms/letter/ContentBlock";
import LetterImg from "./../../components/atoms/letter/LetterImg";
import LetterCanvasArea from "./../../components/atoms/letter/LetterCanvasArea";
import CanvasOptionBar from "../../components/molecules/letter/CanvasOptionBar";

const LetterWritePage = () => {
  const [options, setOptions] = useState({
    // 편지지 옵션
    paper: LetterOptions.PAPERS[0],
    font: LetterOptions.FONTS[0],
    age: LetterOptions.AGES[0],
    allowReply: false,
  });
  // 캔버스 옵션
  const [canvasOptions, setCanvasOptions] = useState({
    color: "#000000",
    stroke: 1,
    drawMode: true,
    initTrigger: false,
  });

  const [act, setAct] = useState(true); // [편지지,도화지] 토글
  const [optionToggle, setOptionToggle] = useState(false); // 편지 옵션창 토글
  const [modalToggle, setModalToggle] = useState(false); // 편지지 선택 모달창 토글
  const [charCount, setCharCount] = useState(0); // 편지 글자 수
  const [charCountWarning, setCharCountWarning] = useState(true); // 글자수 미만 또는 초과로 인한 경고 표시
  const [sizeX, setSizeX] = useState(window.innerWidth); // 브라우저 너비 측정
  const [canvasSaveTrigger, setCanvasSaveTrigger] = useState(false); // 도화지 그린 그림 저장 트리거

  const titleInput = useRef(); // 제목 ref (값 가져오기, focus)
  const contentInput = useRef(); // 내용 ref (값 가져오기, ref)

  const wrapRef = useRef();

  /**
   * @description 편지지 텍스트 입력 시 이벤트
   * @param {number} length
   */
  const handleLetterWrite = (length) => {
    setCharCount(length);
  };

  /**
   * @description "지우기" 버튼 클릭 시 내용 지우는 이벤트
   */
  const handleDeleteContent = () => {
    if (act) {
      contentInput.current.value = "";
    } else {
      setCanvasOptions({
        ...canvasOptions,
        initTrigger: !canvasOptions.initTrigger,
      });
    }
  };

  /**
   * @description 화면크기 재조정시 이벤트, 편지지 옵션창 display 조정
   */
  const handleResize = () => {
    debounce(() => {
      setSizeX(window.innerWidth);
    }, 100);
  };

  /**
   * @description 편지지 선택 시 이벤트
   */
  const handleSelectPaper = (e) => {
    console.log(e.target);
    console.log(e.target.name);
    setOptions({ ...options, paper: e.target.name });
    setModalToggle(false);
  };

  /**
   * @description "보내기" 버튼 눌렀을 시 이벤트
   */
  const handleLetterSend = () => {
    // 편지지
    if (act) {
    }
    // 도화지
    else {
      setCanvasSaveTrigger(true);
    }
  };

  useEffect(() => {
    setCharCount(0);
  }, [act]);

  useEffect(() => {
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
          ref={wrapRef}
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
              <CanvasOptionBar
                canvasOptions={canvasOptions}
                setCanvasOptions={setCanvasOptions}
              />
              <LetterCanvasArea
                color="black"
                stroke="5"
                wrap={wrapRef.current}
                canvasOptions={canvasOptions}
                canvasSaveTrigger={canvasSaveTrigger}
                setCanvasSaveTrigger={setCanvasSaveTrigger}
              >
                이 브라우저는 캔버스를 지원하지 않습니다.
              </LetterCanvasArea>
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
            onClick={() => handleLetterSend()}
          >
            보내기
          </Button>
        </ContentBlock>
        {/* 옵션창 */}
        <LetterOptionBox
          optionToggle={optionToggle}
          sizeX={sizeX}
          options={options}
          setOptions={setOptions}
          setModalToggle={() => setModalToggle(true)}
        />
        {/* 옵션 토글 버튼 */}
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
        {/* 편지지 선택 모달창 */}
        <Modal
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
          titleText={"편지지 선택"}
        >
          <PapersSelectGrid>
            {LetterOptions.PAPERS.map((item, key) => (
              <LetterDesignChoice
                name={item}
                path={`${process.env.PUBLIC_URL}/assets/images/letter/${item}.png`}
                text={item}
                key={key}
                onClick={handleSelectPaper}
              />
            ))}
          </PapersSelectGrid>
        </Modal>
      </RowCenterWrapper>
    </>
  );
};

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

const PapersSelectGrid = styled.div`
  display: grid;
  grid-template-rows: "500px 500px";
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4%;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  place-items: center;

  ${media.tablet2`
    grid-template-columns: repeat(2, 1fr);
  `};

  ${media.phone`
    grid-template-columns: repeat(1, 1fr);
  `};
`;

export default LetterWritePage;
