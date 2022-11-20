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
			<MouseScrollDownMouse></MouseScrollDownMouse>
			<ArrowWrapper marginTop="2rem">
				<MouseScrollDownArrow width="2rem" height="2rem" animation_delay="0.1s" margin="0 0 0 0" padding="0 0 0 0"></MouseScrollDownArrow>
			</ArrowWrapper>
		</S1_arrow>
	);
};

MouseScrollDownArrowGroup.defaultProps = {
	isRight: "1",
};

const S1_arrow = styled.div`
	display: flex;
	position: absolute;
	width: auto;
	height: 20vh;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	animation: ${(props) => (props.isRight ? arrow_down : 0)} 1.5s infinite;
`;

const ArrowWrapper = styled.div`
	display: flex;
	position: absolute;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: ${(props) => props.marginTop};
`;

export default MouseScrollDownArrowGroup;
