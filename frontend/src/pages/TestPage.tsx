import React from "react";
import styled from "styled-components";
import BackgroundVideo from "../components/atoms/BackgroundVideo";
import Title from "../components/atoms/Title";
import Button from "./../components/atoms/Button";

const TestPage = () => {
  return (
    <>
      <BackgroundVideo
        isBlur={true}
        path={`${process.env.PUBLIC_URL}/assets/video/bg1.mp4`}
      />
      <TestContainer>
        <Title text="제목임다"></Title>
        <Button
          text="보 내 기"
          fontSize="1.5rem"
          height="5rem"
          width="10rem"
          padding="0.5rem"
          onClick={() => alert("hello!")}
          shadow={true}
          hoverBgOpacity="0.5"
        />
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

export default TestPage;
