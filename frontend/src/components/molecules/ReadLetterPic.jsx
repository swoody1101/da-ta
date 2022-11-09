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

const ReadLetterPic = ({ info }) => {
  const setReportModal = useSetRecoilState(reportModalState);

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
      <LetterContent src={info.imageLetterUrl} />
      <Container
        width="96%"
        height={SizeTypes.PC_TITLE_HEIGHT}
        padding="0.5rem 0 0.5rem 0"
      >
        <LetterTitle width="96%" fontSize="1.2rem" fontWeight="bold">
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

const LetterContent = styled.img`
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

const IconReportBtn = styled.div`
  margin-right: 15px;
  display: none;
  ${media.phone`
    display: block;
  `}
`;
export default ReadLetterPic;
