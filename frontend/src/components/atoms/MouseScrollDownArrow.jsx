/**
 * @author chaeyoon
 */
import React from "react";
import styled, { keyframes } from "styled-components";

//화살표 관련 keyframe
const arrow_wave = keyframes`
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

const MouseScrollDownArrow = ({ ...props }) => (
  <Scroll_arrow {...props}></Scroll_arrow>
);

MouseScrollDownArrow.defaultProps = {
  width: "10vw",
  height: "10vh",
  animation_delay: "0s",
  margin_top: "10px",
  isRight: "1",
};

const Scroll_arrow = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-right: 5px solid white;
  border-bottom: 5px solid white;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  animation: ${(props) => (props.isRight ? arrow_wave : 0)} 1s infinite;
  animation-direction: alternate;
  animation-delay: ${(props) => props.animation_delay};
  margin-top: ${(props) => props.margin_top};
`;

export default MouseScrollDownArrow;
