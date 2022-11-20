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

const BottleOfLetter = ({ path, ...props }) => {
	return (
		<BG {...props}>
			<img src={path} width="100%" height="100%" />
		</BG>
	);
};

BottleOfLetter.defaultProps = {
	path: `${process.env.PUBLIC_URL}/assets/images/common/bottle_of_letter_btn.png`,
	width: "100%",
	height: "auto",
	isRight: "1",
};

const moveBottle = keyframes`
  0% {
    margin-top: 0px;
  }
  100% {
    margin-top: 20px;
  }
`;

const BG = styled.div`
	width: ${(props) => props.width || "100%"};
	height: ${(props) => props.height || "auto"};
	align-items: center;
	justify-content: center;
	overflow: hidden;
	position: ${(props) => props.position || "absolute"};
	z-index: 1.5;
	animation: ${moveBottle} 1.5s linear 0s infinite alternate;

	${media.phone`
  	width: ${(props) => props.mWidth || "80%"};
  	height: ${(props) => props.mHeight || "auto"};
	`}
`;

export default BottleOfLetter;
