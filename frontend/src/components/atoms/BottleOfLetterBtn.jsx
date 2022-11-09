/**
 * @author chaeyoon
 */
/**
 *
 * @param path 물병 사진 경로
 */
import React from "react";
import styled, { keyframes } from "styled-components";
import { media } from "../../utils/styleUtil";

export const BottleOfLetterBtn = ({ children, onClick, ...props }) => {
  return (
    <StyledBtn {...props} onClick={onClick}>
      {children}
    </StyledBtn>
  );
};

BottleOfLetterBtn.defaultProps = {
  width: "250px",
  height: "250px", //원래는 20vh
  // mWidth: "70%",
  // mHeight: "70%", //원래는 20vh
  isRight: "1",
};

const StyledBtn = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.margin};
  background: url("/assets/images/common/bottle_of_letter_btn.png");
  background-repeat: no-repeat;
  border: 0;
  overflow: hidden;
  z-index: 1.5;
  animation: ${(props) => (props.isRight ? moveBottle : moveBottle)} 1.5s linear
    0s infinite alternate;

  ${media.phone`
   width: ${(props) => props.mWidth};
   height: ${(props) => props.mHeight};
 `}
`;

const moveBottle = keyframes`
   0% {
     margin-top: 0px;
   }
   100% {
     margin-top: 30px;
   }
   `;

export default BottleOfLetterBtn;
