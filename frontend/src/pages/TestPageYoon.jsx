import React from "react";
import styled from "styled-components";
import LetterOfBottle from "../components/atoms/LetterOfBottle";
import Title from "../components/atoms/Title";
import Button from "../components/atoms/Button";
import { MainText } from "../components/atoms/Text";
import Input from "../components/atoms/Input";
import DropDownInput from "../components/atoms/DropDownInput";

const TestPageYoon = () => {
  const list = ["aa", "bbb", "cccc", "d"];

  return (
    <>
      <TestContainer>
        <Title color="black">y의testpage</Title>
        <LetterOfBottle/>
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
        <Input />
        <DropDownInput itemList={list}></DropDownInput>

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

export default TestPageYoon;
