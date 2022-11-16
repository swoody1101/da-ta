import React from "react";
import styled from "styled-components";

const SlickArrow = ({ direction, style, onClick }) => {
	return <Container onClick={onClick}>{direction === "prev" ? "◀" : "▶"}</Container>;
};

const Container = styled.div`
	display: flex;
	width: 1rem;
	height: 1rem;
	padding: 1rem;
	border-radius: 100%;
	cursor: pointer;
	transition: 0.25s ease;
	font-size: 2rem;
	align-items: center;
	justify-content: center;
	outline: none;
	-webkit-tap-highlight-color: transparent;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

	&:hover {
		background-color: rgba(38, 38, 38, 0.25);
	}
`;

export default SlickArrow;
