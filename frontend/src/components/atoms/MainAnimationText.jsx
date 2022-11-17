/**
 * @author boyeon
 */
/**
 * @param opacity 투명도 number, Default: .5
 * @param height 파도 높이(px) number, Default: 150
 * @param isRight 파도 진행방향 boolean
 * @param frequency 반복 주기 number
 */
import React from "react";
import styled, { keyframes } from "styled-components";
import { media } from "../../utils/styleUtil";

const typing = keyframes`
  from {
    width: 0;
  }
`;

const blink = keyframes`  
50% {
    border-color: transparent;
  }
`;

export const MainAnimationText = ({ ...props }) => (
  <AnimationText {...props}></AnimationText>
);

MainAnimationText.defaultProps = {
  isRight_1: "1",
  isRight_2: "1",
};

const AnimationText = styled.p`
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  color: white;
  width: 22ch;
  text-align: center;
  margin: ${(props) => props.margin};
  font-weight: ${(props) => props.fontWeight};
  animation: ${(props) => (props.isRight_1 ? typing : 0)} 0.1s steps(16),
    ${(props) => (props.isRight_2 ? blink : 0)} 0.5s step-end infinite alternate;
  animation-delay: 0.1s;
  overflow: hidden;

  border-right: 3px solid;
  white-space: nowrap;

  ${media.phone`
  font-size: ${(props) => props.mFont_size};
`}
`;
