import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "./../../components/atoms/Title";
import Button from "./../../components/atoms/Button";
import { MainText } from "./../../components/atoms/Text";
import { RowCenterWrapper } from "./../../styles/Wrapper";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<RowCenterWrapper>
			<Container>
				<Title fontSize="2rem">Oops...!</Title>
				<MainText margin="1rem 0 0 0">페이지를 찾을 수 없습니다.</MainText>
				<Button margin="2rem 0 0 0" width="6rem" height="4rem" shadow={true} onClick={() => navigate("/")}>
					홈
				</Button>
			</Container>
		</RowCenterWrapper>
	);
};

const Container = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: black;
	color: white;
`;

export default NotFound;
