import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BackgroundVideo from "../components/atoms/BackgroundVideo";
import Title from "../components/atoms/Title";
import Button from "../components/atoms/Button";
import { MainText } from "../components/atoms/Text";
import Input from "../components/atoms/Input";
import DropDownInput from "../components/atoms/DropDownInput";
import MainNav from "./../components/templates/MainNav";
import { useRecoilState } from "recoil";
import { loginState } from "./../recoil/Atoms";
import { getLetterBackgrounds } from "../api/letterWriteAPI";

const TestPage = () => {
	// for DropDown
	const list = ["aa", "bbb", "cccc", "d"];
	const [percent, setPercent] = useState(50);
	const [isLogin, setIsLogin] = useRecoilState(loginState);

	useEffect(() => {
		console.log(isLogin);
	});

	return (
		<>
			{/* <Loading text={"페이지를 불러오는 중입니다..."} /> */}
			<MainNav />
			<BackgroundVideo isBlur={true} path={`${process.env.PUBLIC_URL}/assets/video/bg1.mp4`} />
			<TestContainer>
				<Title>닿다</Title>
				{isLogin ? <Title>로그인</Title> : <Title>로그아웃</Title>}
				<Button fontSize="1.5rem" height="5rem" width="10rem" padding="0.5rem" onClick={() => alert("hello!")} shadow={true} hoverBgOpacity="0.5">
					보 내 기
				</Button>
				<MainText margin="5rem 0 0 0">
					안녕하세요!
					<br />
					여기는 '닿다'에요
				</MainText>
				<MainText margin="5rem 0 0 0">누군가에게 편지를 보낼 수 있어요</MainText>
				<MainText margin="20rem 0 0 0">당신에게도 소중한 편지 한 통이 도착할 수 있답니다</MainText>
				<MainText margin="20rem 0 0 0">지금 편지를 쓰러 가 볼까요?</MainText>
				<TestBlock>
					<Input />
				</TestBlock>
				<TestBlock>
					<DropDownInput itemList={list}></DropDownInput>
				</TestBlock>
				<TestBlock>
					<button onClick={letterBackgroundTest}>클릭</button>
					<ProgressBar className="ldBar label-center" data-preset="bubble" data-value={`${percent}`}></ProgressBar>
				</TestBlock>
			</TestContainer>
		</>
	);
};

const TestContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	margin-top: 6rem;
	align-items: center;
	justify-content: center;
	// background-color: #d1c4e9;
`;

const TestBlock = styled.div`
	margin: 1rem;
`;

const ProgressBar = styled.div`
  width: 500px;
  height; 500px;
`;

export default TestPage;
