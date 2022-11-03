import styled from "styled-components";
import { SizeTypes } from "./../../constants/Sizes";

export const LetterTextArea = styled.textarea`
	display: flex;
	resize: none;
	border: none;
	z-index: 10;
	width: 100%;
	height: ${screen.width > 480 ? SizeTypes.PC_CONTENT_HEIGHT : SizeTypes.MOBILE_CONTENT_HEIGHT};
	padding: 1rem;
	box-sizing: border-box;
	background: transparent;
	font-family: ${(props) => props.fontFamily || ""};
	font-size: 1rem;
	line-height: 1.5rem;
	color: black;

	&:focus {
		outline: none;
	}
`;
