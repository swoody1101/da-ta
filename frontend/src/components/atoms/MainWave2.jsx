/**
 * @author chaeyoon
 */
/**
 * @param opacity 투명도 number, Default: .5
 * @param height 파도 높이(px) number, Default: 150
 * @param isRight 파도 진행방향 boolean
 * @param frequency 반복 주기 number
 */

import React from "react";
import styled, { keyframes } from "styled-components";

export const MainWave2 = ({ ...props }) => <StyledDiv {...props}></StyledDiv>;

const moveRight = keyframes`
   0% {
     background-position: 0;
   }
   100% {
     background-position: 1280px;
   }
 `;

const moveLeft = keyframes`
   0% {
     background-position: 1280px; 
   }
   100% {
     background-position: 0;
   }
 `;

MainWave2.defaultProps = {
	opacity: "0.5",
	height: "320px",
};

const StyledDiv = styled.div`
	position: absolute;
	width: 100vw;
	height: ${(props) => props.height};
	bottom: 0;
	left: 0;
	overflow: hidden;
	z-index: ${(props) => props.zIndex};
	background: url("/assets/images/common/mainwave2.png");
	opacity: ${(props) => props.opacity};
	animation: ${(props) => (props.isRight ? moveRight : moveLeft)} ${(props) => props.frequency}s linear infinite;
`;
