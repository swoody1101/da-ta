import React from "react";
import { useState } from "react";
import BackgroundVideo from "../../components/atoms/BackgroundVideo";
import { Wrapper } from "../../styles/Wrapper";
import Button from "../../components/atoms/Button";
import styled, { keyframes } from "styled-components";
import { getLetter } from "../../api/letterReadAPI";
import { useSetRecoilState } from "recoil";
import { letterState, mypageRouterState } from "../../recoil/Atoms";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { downloadFirebaseStorage } from "../../utils/firebaseStorage";

const LetterGetPage = () => {
  const navigate = useNavigate();
  const setRouterIndex = useSetRecoilState(mypageRouterState);
  const setLetter = useSetRecoilState(letterState);
  let [blur, SetBlur] = useState(true);
  useEffect(() => {
    setRouterIndex(2);
  }, []);

  const openBottle = async () => {
    // 로딩스피너
    const response = await getLetter();
    if (response.status - 200 < 3 && response.status) {
      const letter = response.data;
      if (letter.letterInfo.imageLetterUrl) {
        letter.letterInfo.imageLetterUrl = await downloadFirebaseStorage(
          `${letter.letterInfo.imageLetterUrl}.png`
        );
      }
      // 얘도 예외처리
      setLetter(letter);
      navigate("/read");
    }
  };

  return (
    <>
      <ReadWrapper>
        <ShakerDiv>
          <Bottle
            src={`${process.env.PUBLIC_URL}/assets/images/common/bottle_of_letter_btn.png`}
          ></Bottle>
        </ShakerDiv>
        <Button
          width={"200px"}
          height={"50px"}
          hasBorder={true}
          onClick={async () => {
            openBottle();
          }}
        >
          편지 받기
        </Button>
      </ReadWrapper>
      <BackgroundVideo
        isBlur={blur}
        path={`${process.env.PUBLIC_URL}/assets/video/bg2.mp4`}
      />
    </>
  );
};

const fallingBottle = keyframes`
  0% {
    transform: rotate(0deg);
    margin-top: -25vh;
    margin-bottom: 25vh;
    opacity: 0;
  }
  50% {
    transform: rotate(-20deg);
    margin-top: 0px;
    margin-bottom: 0px;
    opacity: 0.5;
  }
  100% {
    transform: rotate(-10deg);
    opacity: 1;
  }
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

const ShakerDiv = styled.div`
  animation: ${shakingBottle} 3s 2.5s linear infinite;
`;

const ReadWrapper = styled(Wrapper)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Bottle = styled.img`
  src: ${(props) => props.src};
  height: 20vh;
  animation: ${fallingBottle} 2.5s linear forwards;
`;

export default LetterGetPage;
