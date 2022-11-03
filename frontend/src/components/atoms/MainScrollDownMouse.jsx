/**
 * @author chaeyoon
 */
import React from "react";
import styled, { keyframes } from "styled-components";

//화살표 관련 keyframe
const sdb = keyframes`
0% {
    transform: translate(0, 0);
    opacity: 0;
}
40% {
    opacity: 1;
}
80% {
    transform: translate(0, 40px);
    opacity: 0;
}
100% {
    opacity: 0;
}
`;

const MouseScrollDownMouse = ({ ...props }) => (
  <Scroll_mouse {...props}></Scroll_mouse>
);

MouseScrollDownMouse.defaultProps = {
  width: "10vw",
  height: "10vh",
  isRight: "1",
  margin_top: "85vh",
};

const Scroll_mouse = styled.div`
  display: flex;
  position: absolute;
  z-index: 20000;
  top: 0;
  min-width: 50px;
  max-width: 100px;
  min-height: 90px;
  max-height: 100px;
  border: 4px solid #fff;
  border-radius: 50px;
  box-sizing: border-box;
  margin-top: ${(props) => props.margin_top};
  ::before {
    position: absolute;
    top: 30px;
    left: 50%;
    content: "";
    width: 6px;
    height: 6px;
    margin-left: -3px;
    background-color: #fff;
    border-radius: 100%;
    animation: ${(props) => (props.isRight ? sdb : 0)} 2s infinite;
    box-sizing: border-box;
  }
`;

export default MouseScrollDownMouse;

// atom에 a span && a span ::before 만들고

// landing p에 a만들기

//  a {
//     padding-top: 60px;
//   }
//   a span {
//     position: absolute;
//     top: 0;
//     left: 50%;
//     width: 30px;
//     height: 50px;
//     margin-left: -15px;
//     border: 2px solid #fff;
//     border-radius: 50px;
//     box-sizing: border-box;
//   }
//   a span::before {
//     position: absolute;
//     top: 10px;
//     left: 50%;
//     content: '';
//     width: 6px;
//     height: 6px;
//     margin-left: -3px;
//     background-color: #fff;
//     border-radius: 100%;
//     animation: sdb 2s infinite;
//     box-sizing: border-box;
//   }

//   @keyframes sdb {
//     0% {
//       transform: translate(0, 0);
//       opacity: 0;
//     }
//     40% {
//       opacity: 1;
//     }
//     80% {
//       transform: translate(0, 20px);
//       opacity: 0;
//     }
//     100% {
//       opacity: 0;
//     }
//   }
