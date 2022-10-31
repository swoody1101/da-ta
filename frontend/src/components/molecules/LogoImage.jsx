import React from "react";
import styled from "styled-components";

const LogoImage = () => {
	return (
		<Container>
			<img src={`${process.env.PUBLIC_URL}/assets/logo/data_logo.png`} height="64px" />
			<LogoText>DA-TA</LogoText>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: row;
	position: absolute;
	left: 3rem;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

const LogoText = styled.div`
	display: flex;
	font-size: 2rem;
	line-height: 64px;
	font-weight: bold;
	color: #ec407a;
	margin-left: 8px;
`;

export default LogoImage;
