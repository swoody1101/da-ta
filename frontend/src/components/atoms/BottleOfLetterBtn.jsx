/**
 * @author chaeyoon
 */
import React from "react";
import styled, { keyframes } from "styled-components";
import { media } from "../../utils/styleUtil";

const BottleOfLetterBtn = ({ onClick, ...props }) => {
	return (
		<StyledBtn {...props} onClick={onClick}>
			<img src={`${process.env.PUBLIC_URL}/assets/images/common/bottle_of_letter_btn.png`} width="100%" height="100%" />
		</StyledBtn>
	);
};

const moveBottle = keyframes`
  0% {
    bottom: 220px;
  }
  100% {
    bottom: 260px;
  }
`;

const StyledBtn = styled.button`
	display: flex;
	width: ${(props) => props.width || "12rem"};
	height: ${(props) => props.height || "12rem"};
	position: absolute;
	// bottom: calc(-90vh + 348px);
	bottom: 240px;
	left: 50%;
	transform: translate(-50%, 0%);
	align-items: center;
	justify-content: center;
	margin: ${(props) => props.margin};
	border: 0;
	z-index: 5;
	background-color: transparent;
	animation: ${moveBottle} 2.5s linear 0s infinite alternate;
	cursor: pointer;

	&:focus {
		outline: none;
		-webkit-tap-highlight-color: transparent;
	}

	${media.phone`
    width: ${(props) => props.mWidth || "12rem"};
    height: ${(props) => props.mHeight || "12rem"};
  `}
`;

export default BottleOfLetterBtn;
