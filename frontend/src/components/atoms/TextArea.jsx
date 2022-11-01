import styled from "styled-components";

export const LetterTextArea = styled.textarea`
	display: flex;
	resize: none;
	border: none;
	z-index: 10;
	width: 100%;
	height: 100%;
	padding: 1rem;
	box-sizing: border-box;
	background: transparent;
	font-size: 1rem;
	line-height: 1.5rem;
	color: black;

	&:focus {
		outline: none;
	}
`;
