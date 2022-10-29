import React, { useState } from "react";
import styled from "styled-components";
import BackgroundVideo from "../components/atoms/BackgroundVideo";
import Title from "../components/atoms/Title";
import Button from "../components/atoms/Button";
import { MainText } from "../components/atoms/Text";
import Input from "../components/atoms/Input";
import DropDownInput from "../components/atoms/DropDownInput";

const TestPage = () => {
	// for DropDown
	const list = ["aa", "bbb", "cccc", "d"];

	return (
		<>
			<BackgroundVideo isBlur={true} path={`${process.env.PUBLIC_URL}/assets/video/bg1.mp4`} />
			<TestContainer>
				<Title>닿다</Title>
				<Button fontSize="1.5rem" height="5rem" width="10rem" padding="0.5rem" onClick={() => alert("hello!")} shadow={true} hoverBgOpacity="0.5">
					보 내 기
				</Button>
				<MainText margin="5rem 0 0 0">
					안녕하세요!
					<br />
					여기는 '닿다'에요
				</MainText>
				<TestBlock>
					<Input />
				</TestBlock>
				<TestBlock>
					<DropDownInput itemList={list}></DropDownInput>
				</TestBlock>

				<TestBlock>
					<Button onClick={() => alert("hello")}>
						<img src={`${process.env.PUBLIC_URL}/assets/images/auth/kakao_login.png`}></img>
					</Button>
				</TestBlock>
			</TestContainer>
		</>
	);
};

const TestContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	align-items: center;
	justify-content: center;
`;

const TestBlock = styled.div`
	margin: 1rem;
`;

export default TestPage;
