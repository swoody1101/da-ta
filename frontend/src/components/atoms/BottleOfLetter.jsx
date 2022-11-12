/**
 * @author chaeyoon
 */
import React from "react";
import styled, { keyframes } from "styled-components";
import { media } from "../../utils/styleUtil";
/**
 *
 * @param path 물병 사진 경로
 */

const moveBottle = keyframes`
  0% {
    margin-top: 0px;
  }
  100% {
    margin-top: 20px;
  }
  `;

const BottleOfLetter = ({ path }) => {
  return (
    <BG>
      <img src={path}></img>
    </BG>
  );
};

BottleOfLetter.defaultProps = {
  path: `${process.env.PUBLIC_URL}/assets/images/common/bottle_of_letter_btn.png`,
  width: "10%",
  height: "10%", //원래는 20vh
  isRight: "1",
};

const BG = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  overflow: hidden;
  position: absolute;
  z-index: 1.5;
  animation: ${(props) => (props.isRight ? moveBottle : moveBottle)} 1.5s linear
    0s infinite alternate;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${media.phone`
  width: ${(props) => props.mWidth};
  height: ${(props) => props.mHeight};
`}
`;

export default BottleOfLetter;

//  .chatbox {animation: motion 0.3s linear 0s infinite alternate; margin-top: 0;
// 	-webkit-animation: motion 0.3s linear 0s infinite alternate; margin-top: 0;
// }
