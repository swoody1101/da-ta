import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import BackgroundVideo from "../../components/atoms/BackgroundVideo";
import BottleOfLetter from "../../components/atoms/BottleOfLetter";
import Button from "../../components/atoms/Button";
import { MainText } from "../../components/atoms/Text";
import { CenterWrapper } from "./../../styles/Wrapper";
import { useNavigate } from "react-router-dom";
import { media } from "../../utils/styleUtil";

const LetterWriteSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <BGWrapper>
      <BackgroundVideo
        blurOpacity={4}
        path={`${process.env.PUBLIC_URL}/assets/video/bg1.mp4`}
      />
      <Container>
        <BottleWrapper>
          <BottleOfLetter position="static" />
        </BottleWrapper>
        <MainText margin="8rem 0 0 0" fontWeight="bold" mFont_size="1.5rem">
          당신의 소중한 이야기가
          <br />
          바다에 띄워졌습니다.
        </MainText>
        <Button
          margin="2rem 0 0 0"
          fontSize="1.5rem"
          width="8rem"
          height="3.5rem"
          mWidth="80%"
          hoverBgOpacity="0.5"
          onClick={() => navigate("/")}
        >
          <MainText margin="0 0 0 0" fontSize="1.25rem" mFont_size="1.5rem">
            메인으로
          </MainText>
        </Button>
      </Container>
    </BGWrapper>
  );
};

const FadeIn = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`;

const BGWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  animation: ${FadeIn} 2s linear;
`;

const Container = styled(CenterWrapper)`
  background-color: transparent;
  flex-direction: column;
  opacity: 0.75;
`;

const BottleWrapper = styled.div`
  display: flex;
  width: 20%;
  height: 15%;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 5rem yellow);

  ${media.phone`
		width: 80%;
		height: 0;
	`}
`;

export default LetterWriteSuccessPage;
