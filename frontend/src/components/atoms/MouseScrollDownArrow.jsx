/**
 * @author chaeyoon
 */
import React from "react";
import styled, { keyframes } from "styled-components";

//화살표 관련 keyframe
const arrowWave = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
  `;

const arrowDown = keyframes`
  0%{
    top:28px;
  }
  50%{
    top:40px;
  }
  100%{
    top:28px;
  }
  `;

const MouseScrollDownArrow = () => {
  return <Scroll_arrow />;
};

//props 기본값
MouseScrollDownArrow.defaultProps = {
  width: "100vh",
  height: "100vh", //원래는 20vh
  isRight: "1",
  animation_delay: "0.1",
};

//arrow가 위치할 div
const Scroll_arrow = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-right: 3px solid white;
  border-bottom: 3px solid white;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  animation: arrow_wave 1s infinite;
  animation-direction: alternate;
  animation-delay: ${(props) => props.animation_delay}s;
  margin-top: 30vh;
`;

export default MouseScrollDownArrow;

{
  /* 
<div class="s1_arrow">
  <div class="scroll-arrow"></div>
  <div class="scroll-arrow"></div>
  <div class="scroll-arrow"></div>
</div> */
}

// body{
//     background:#000; ////////
//     text-align:center;///////
//   }
//   .s1_arrow{
//     display:inline-block;
//     position:relative;
//     top:28px;
//     margin-left:-10px;
//     text-align:center;
//     animation:arrow_down 1.5s infinite;
//   }
//   .scroll-arrow {
//     width:8px;
//     height:8px;
//     border-right: 3px solid white;
//     border-bottom: 3px solid white;
//     transform: rotate(45deg);
//     -webkit-transform: rotate(45deg);
//     -moz-transform: rotate(45deg);
//     -o-transform: rotate(45deg);
//     -ms-transform: rotate(45deg);
//     animation: arrow-wave 1s infinite;
//     animation-direction: alternate;
//   }

//   .scroll-arrow:nth-child(1) {
//     animation-delay: 0.1s;
//   }
//   .scroll-arrow:nth-child(2) {
//     margin-top:6px;
//     animation-delay: 0.2s;
//   }
//   .scroll-arrow:nth-child(3) {
//     margin-top:6px;
//     animation-delay: 0.3s;
//   }

//   @keyframes arrow-wave {
//   0% {opacity: 0;}
//   50% {opacity: .5;}
//   100% {opacity: 1;}
//   }
//   @keyframes arrow_down{
//   0%{top:28px;}
//   50%{top:40px;}
//   100%{top:28px;}
//   }
