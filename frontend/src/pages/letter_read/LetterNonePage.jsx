import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import BackgroundVideo from "../../components/atoms/BackgroundVideo";
import { Wrapper } from "../../styles/Wrapper";

const LetterNonePage = () => {
  return (
    <>
      <ReadWrapper>
        <Bottle
          src={`${process.env.PUBLIC_URL}/assets/images/common/no_letter.png`}
        ></Bottle>
        <TextDiv>떠내려온 편지가 없어요!</TextDiv>
        <TextDiv>편지를 보내주세요</TextDiv>
      </ReadWrapper>
      <BackgroundVideo
        isBlur={true}
        path={`${process.env.PUBLIC_URL}/assets/video/bg2.mp4`}
      />
    </>
  );
};

const ReadWrapper = styled(Wrapper)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const shakingBottle = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const Bottle = styled.img`
  src: ${(props) => props.src};
  height: 20vh;
  animation: ${shakingBottle} 2s linear infinite;
`;

const TextDiv = styled.div`
  color: #f5f5f5;
  font-size: 1.4rem;
  margin-top: 15px;
`;

export default LetterNonePage;
