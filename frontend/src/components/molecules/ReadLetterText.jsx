import styled from "styled-components";
import { SizeTypes } from "../../constants/Sizes";
import { media } from "../../utils/styleUtil";
import ContentBlock from "../atoms/letter/ContentBlock";
import LetterImg from "../atoms/letter/LetterImg";
import { LetterOptions } from "../../constants/Options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useSetRecoilState } from "recoil";
import { reportModalState } from "../../recoil/Atoms";
import { useEffect, useState, useRef } from "react";

const ReadLetterText = ({ info, nickname }) => {
  const setReportModal = useSetRecoilState(reportModalState);
  const wrapRef = useRef();
  const appearingRef = useRef([]);
  const [showContent, setShowContent] = useState("");
  const DateToString = (writtenDate) => {
    const ToDate = new Date(writtenDate);
    return `${ToDate.getFullYear()}년 ${
      ToDate.getMonth() + 1
    }월 ${ToDate.getDate()}일`;
  };

  const appearing = () => {
    for (let e of appearingRef.current) {
      e.style.opacity = 0;
    }
    setTimeout(() => {
      if (window.innerWidth > 480) {
        wrapRef.current.style.height = SizeTypes.PC_LETTER_HEIGHT;
      } else {
        wrapRef.current.style.height = SizeTypes.MOBILE_LETTER_HEIGHT;
      }
    }, 500);
    setTimeout(() => {
      for (let e of appearingRef.current) {
        e.style.opacity = 1;
      }
    }, 1000);
  };

  useEffect(() => {
    if (info.content !== null) {
      setShowContent(info.content.replaceAll("\n", "<br/>"));
    }
    wrapRef.current.style.height = 0;
    appearing();
  }, []);

  return (
    <ContentBlock
      height={0}
      mWidth={SizeTypes.MOBILE_LETTER_WIDTH}
      mHeight={0}
      flexDirection="column"
      optionToggle={false}
      ref={wrapRef}
    >
      <LetterImg
        src={`${process.env.PUBLIC_URL}/assets/images/letter/${
          LetterOptions.PAPERS[info ? info.backgroundId : 0]
        }.png`}
      />
      <Container
        width="96%"
        height={SizeTypes.PC_TITLE_HEIGHT}
        padding="0.5rem 0 0 0"
        ref={(el) => (appearingRef.current[0] = el)}
      >
        <LetterTitle width="96%" fontSize="1.2rem" fontWeight="bold">
          {info ? info.title : ""}
          <IconReportBtn>
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              style={{
                color: "#F44336",
                cursor: "pointer",
              }}
              size="lg"
              onClick={() => {
                setReportModal(true);
              }}
            />
          </IconReportBtn>
        </LetterTitle>
      </Container>
      <Container
        width="96%"
        height={SizeTypes.PC_TITLE_HEIGHT}
        padding="0 0 0.5rem 0"
        ref={(el) => (appearingRef.current[1] = el)}
      >
        <LetterTitle width="96%" fontSize="1rem" fontWeight="bold">
          {`${DateToString(info && info.writtenDate)}, ${nickname}`}
        </LetterTitle>
      </Container>
      <LetterContent
        fontFamily={LetterOptions.FONTS[info.fontId]}
        ref={(el) => (appearingRef.current[2] = el)}
      >
        <div style={{ flexDirection: "column" }}>
          {info &&
            info.content &&
            info.content.split("\n").map((line, index) => {
              return (
                <span key={index}>
                  {line}
                  <br />
                </span>
              );
            })}
        </div>
      </LetterContent>
    </ContentBlock>
  );
};

const Container = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LetterTitle = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  text-align: left;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  padding: 0.6rem 0.4rem;
  transition: 0.2s ease;
  ${media.phone`
    width: ${(props) => (props.mWidth ? props.mWidth : props.width)};
  `}
`;

LetterTitle.defaultProps = {
  width: "16rem",
  background: "none",
  fontSize: "1rem",
};

const LetterContent = styled.div`
  display: flex;
  resize: none;
  border: none;
  text-align: left;
  z-index: 10;
  width: 100%;
  height: ${SizeTypes.PC_CONTENT_HEIGHT};
  padding: 1rem;
  box-sizing: border-box;
  background: transparent;
  font-family: ${(props) => props.fontFamily || ""};
  font-size: 1rem;
  line-height: 1.5rem;
  color: black;
  overflow-y: auto;

  ${media.phone`
    height: ${SizeTypes.MOBILE_CONTENT_HEIGHT};
  `}
`;

const IconReportBtn = styled.div`
  margin-right: 15px;
  display: none;
  ${media.phone`
    display: block;
  `}
`;
export default ReadLetterText;
