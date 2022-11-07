import styled from "styled-components";
import { SizeTypes } from "../../constants/Sizes";
import { media } from "../../utils/styleUtil";
import ContentBlock from "../atoms/letter/ContentBlock";
import LetterImg from "../atoms/letter/LetterImg";
import { LetterOptions } from "../../constants/Options";

const ReadLetter = ({ info }) => {
  return (
    <ContentBlock
      height={SizeTypes.PC_LETTER_HEIGHT}
      mWidth={SizeTypes.MOBILE_LETTER_WIDTH}
      mHeight={SizeTypes.MOBILE_LETTER_HEIGHT}
      flexDirection="column"
      optionToggle={false}
    >
      <LetterImg
        src={`${process.env.PUBLIC_URL}/assets/images/letter/${
          LetterOptions.PAPERS[info.backgroundId]
        }.png`}
      />
      <Container
        width="96%"
        height={SizeTypes.PC_TITLE_HEIGHT}
        padding="0.5rem 0 0.5rem 0"
      >
        <LetterTitle width="96%" fontSize="1.2rem" fontWeight="bold">
          {info.title}
        </LetterTitle>
      </Container>
      <LetterContent fontFamily={LetterOptions.FONTS[info.fontId]}>
        {info.content}
      </LetterContent>
    </ContentBlock>
  );
};

const Container = styled.div`
  display: flex;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LetterTitle = styled.p`
  width: 100%;
  height: 100%;
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

export default ReadLetter;
