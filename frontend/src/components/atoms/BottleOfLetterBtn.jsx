/**
 * @author chaeyoon
 */
import React from "react";
import styled, { keyframes } from "styled-components";
import { media } from "../../utils/styleUtil";
import { MainSmallText } from "./Text";

const BottleOfLetterBtn = ({ onClick, ...props }) => {
  return (
    <StyledBtn {...props} onClick={onClick}>
      <BlinkWrapper>
        <MainSmallText fontSize="1.0rem" mFont_size="1.1rem">
          &nbsp;클릭!
        </MainSmallText>
        <MainSmallText fontSize="1.75rem" mFont_size="1.3rem">
          ⇙
        </MainSmallText>
      </BlinkWrapper>
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/common/bottle_of_letter_btn.png`}
        width="100%"
        height="100%"
      />
    </StyledBtn>
  );
};

const moveBottle = keyframes`
  0% {
    bottom: 220px;
  }
  100% {
    bottom: 260px;
  }
`;

const StyledBtn = styled.button`
  display: flex;
  position: relative;
  flex-direction: column;
  width: ${(props) => props.width || "12rem"};
  height: ${(props) => props.height || "12rem"};
  position: absolute;
  // bottom: calc(-90vh + 348px);
  bottom: 240px;
  left: 50%;
  transform: translate(-50%, 0%);
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.margin};
  border: 0;
  z-index: 5;
  background-color: transparent;
  animation: ${moveBottle} 2.5s linear 0s infinite alternate;
  cursor: pointer;

  &:focus {
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  ${media.phone`
    width: ${(props) => props.mWidth || "12rem"};
    height: ${(props) => props.mHeight || "12rem"};
  `}
`;

const Blink = keyframes`
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1.0;
  }
`;

const BlinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 1rem;
  right: 1rem;
  animation: ${Blink} 1.1s linear 0s infinite alternate;
`;

export default BottleOfLetterBtn;
