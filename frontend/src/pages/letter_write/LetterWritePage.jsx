import React, { useRef, useState } from "react";
import { RowCenterWrapper } from "./../../styles/Wrapper";
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
import { popErrorAlert, popWarningAlert } from "./../../utils/sweetAlert";
import { checkHarmTextLetter, saveTextLetter } from "../../api/letterWriteAPI";
import { useNavigate } from "react-router-dom";

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
  const wrapRef = useRef(); // 편지지 영역 ref
  const unshowRef = useRef([]); // 보내기 버튼 누를 시 사라질 영역들 ref

  const navigate = useNavigate();

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
    setOptions({ ...options, paper: e.target.name });
    setModalToggle(false);
  };

  /**
   * @description "보내기" 버튼 눌렀을 시 이벤트
   */
  const handleLetterSend = async () => {
    // 편지지
    if (act) {
      // 1. 유효성 검사
      const title = titleInput.current.value;
      const content = contentInput.current.value;
      if (title.length < 1) {
        popWarningAlert("제목을 입력해주세요.");
        return;
      } else if (content.length < MIN_CHAR_COUNT) {
        popWarningAlert(`편지 내용을 ${MIN_CHAR_COUNT}자 이상 입력해주세요.`);
        return;
      } else if (content.length > MAX_CHAR_COUNT) {
        popWarningAlert(`편지 내용을 ${MAX_CHAR_COUNT}자 이하 입력해주세요.`);
        return;
      }

      // 2. 유해성 검사 - 제목
      const harmResponseTitle = await checkHarmTextLetter({ content: title });
      if (
        !harmResponseTitle ||
        (harmResponseTitle.status !== 200 && harmResponseTitle.status !== 201)
      ) {
        popErrorAlert("편지 전송 오류", "유해성 검사 중 오류가 발생했습니다.");
        return;
      }
      if (harmResponseTitle.data && harmResponseTitle.data.isHarmful) {
        popWarningAlert(
          "부적절한 언어 감지",
          "부적절한 언어가 포함된 편지는 전송할 수 없습니다."
        );
        return;
      }

      // 2. 유해성 검사 - 내용
      const harmResponse = await checkHarmTextLetter({ content: content });
      if (
        !harmResponse ||
        (harmResponse.status !== 200 && harmResponse.status !== 201)
      ) {
        popErrorAlert("편지 전송 오류", "유해성 검사 중 오류가 발생했습니다.");
        return;
      }
      if (harmResponse.data && harmResponse.data.isHarmful) {
        popWarningAlert(
          "부적절한 언어 감지",
          "부적절한 언어가 포함된 편지는 전송할 수 없습니다."
        );
        return;
      }

      // 3. 성공 시 전송
      const response = await saveTextLetter(options, title, content);
      if (!response || (response.status !== 200 && response.status !== 201)) {
        popErrorAlert("편지 전송 오류", "편지 전송 중 오류가 발생했습니다.");
        return;
      }

      // 편지 보내는 애니메이션
      for (let r of unshowRef.current) {
        r.style.opacity = 0;
      }

      setTimeout(() => {
        wrapRef.current.style.margin = "-2rem 0 0 0";
      }, 500);
      setTimeout(() => {
        titleInput.current.style.opacity = 0;
        contentInput.current.style.opacity = 0;
        wrapRef.current.style.height = 0;
      }, 1000);
      setTimeout(() => {
        wrapRef.current.style.margin = "2rem 0 0 0";
      }, 1500);

      setTimeout(() => {
        navigate("/writesuccess");
      }, 2500);
    }
    // 도화지
    else {
      setCanvasSaveTrigger(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCharCount(0);
  }, [act]);

  useEffect(() => {
    charCount < MIN_CHAR_COUNT || charCount > MAX_CHAR_COUNT
      ? setCharCountWarning(true)
      : setCharCountWarning(false);
  }, [charCount]);

  return (
    <>
      <BackgroundGradient start={"E2AAFD"} end={"FFDFC2"} height={"100%"} />

      <RowCenterWrapper>
        <ContentBlock
          margin={SizeTypes.PC_LETTER_MARGIN}
          mWidth={SizeTypes.MOBILE_LETTER_WIDTH}
          optionToggle={optionToggle}
          ref={(el) => (unshowRef.current[0] = el)}
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
          ref={(el) => (unshowRef.current[1] = el)}
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
                myRef={(el) => (unshowRef.current[2] = el)}
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
                options={options}
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
          ref={(el) => (unshowRef.current[3] = el)}
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
