import React, { useState } from "react";
import styled from "styled-components";
import BackgroundVideo from "../components/atoms/BackgroundVideo";
import Title from "../components/atoms/Title";
import Button from "../components/atoms/Button";
import { MainText } from "../components/atoms/Text";
import Input from "../components/atoms/Input";
import DropDownInput from "../components/atoms/DropDownInput";
import Loading from "./../components/molecules/Loading";
import Header from "../components/atoms/Header";
import MainNav from "./../components/templates/MainNav";
import "../utils/progress_bar/loading-bar.js";
import "../utils/progress_bar/loading-bar.css";

const TestPage = () => {
  // for DropDown
  const list = ["aa", "bbb", "cccc", "d"];

  return (
    <>
      {/* <Loading text={"헤헤ㅔ헿헤헤헿"} /> */}
      <MainNav />
      <BackgroundVideo
        isBlur={true}
        path={`${process.env.PUBLIC_URL}/assets/video/bg1.mp4`}
      />
      <TestContainer>
        <Title>닿다</Title>
        <Button
          fontSize="1.5rem"
          height="5rem"
          width="10rem"
          padding="0.5rem"
          onClick={() => alert("hello!")}
          shadow={true}
          hoverBgOpacity="0.5"
        >
          보 내 기
        </Button>
        <MainText margin="5rem 0 0 0">
          안녕하세요!
          <br />
          여기는 '닿다'에요
        </MainText>
        <MainText margin="5rem 0 0 0">
          누군가에게 편지를 보낼 수 있어요
        </MainText>
        <MainText margin="20rem 0 0 0">
          당신에게도 소중한 편지 한 통이 도착할 수 있답니다
        </MainText>
        <MainText margin="20rem 0 0 0">지금 편지를 쓰러 가 볼까요?</MainText>
        <TestBlock>
          <Input />
        </TestBlock>
        <TestBlock>
          <DropDownInput itemList={list}></DropDownInput>
        </TestBlock>
        <TestBlock>
          <ProgressBar
            className="ldBar label-center"
            data-preset="bubble"
            data-value="80"
          ></ProgressBar>
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
  background-color: #d1c4e9;
`;

const TestBlock = styled.div`
  margin: 1rem;
`;

const ProgressBar = styled.div`
  width: 500px;
  height; 500px;
`;

export default TestPage;
