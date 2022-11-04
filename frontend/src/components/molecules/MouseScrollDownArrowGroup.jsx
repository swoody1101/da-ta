/**
 * @author chaeyoon
 */
import React from "react";
import styled, { keyframes } from "styled-components";
import MouseScrollDownArrow from "../atoms/MouseScrollDownArrow";
import MouseScrollDownMouse from "../atoms/MainScrollDownMouse";
import { MainText } from "../atoms/Text";

//화살표 관련 keyframe
const arrow_down = keyframes`
   0%{
     top:2vh;
   }
   50%{
     top:1vh;
   }
   100%{
     top:2vh;
   }
`;

const MouseScrollDownArrowGroup = ({ ...props }) => {
  return (
    <S1_arrow {...props}>
      <MainText>Scroll</MainText>
      <MouseScrollDownMouse margin_top="110px"></MouseScrollDownMouse>
      <ArrowWrapper margin_toparrowWrapper="250px">
        <MouseScrollDownArrow
          width="2rem"
          height="2rem"
          animation_delay="0.1s"
          margin="0 0 0 0"
          padding="0 0 0 0"
        ></MouseScrollDownArrow>
        {/* <MouseScrollDownArrow
        width="2vh"
        height="2vh"
        margin_top="1vh"
        animation_delay="0.3s"
      ></MouseScrollDownArrow>
      <MouseScrollDownArrow
        width="2vh"
        height="2vh"
        margin_top="1vh"
        animation_delay="0.5s"
      ></MouseScrollDownArrow> */}
      </ArrowWrapper>
    </S1_arrow>
  );
};

MouseScrollDownArrowGroup.defaultProps = {
  isRight: "1",
  margin_top: "90%",
  margin_toparrowWrapper: "20vh",
};

const S1_arrow = styled.div`
  display: flex;
  position: absolute;
  width: 10vw;
  height: 20vh;
  margin-top: ${(props) => props.margin_top};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${(props) => (props.isRight ? arrow_down : 0)} 1.5s infinite;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ArrowWrapper = styled.div`
  display: flex;
  position: absolute;
  margin-top: ${(props) => props.margin_toparrowWrapper};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MouseScrollDownArrowGroup;
