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
import { popErrorAlert } from "../../utils/sweetAlert";

const LetterGetPage = () => {
  const navigate = useNavigate();
  const setRouterIndex = useSetRecoilState(mypageRouterState);
  const setLetter = useSetRecoilState(letterState);
  let [blur, SetBlur] = useState(true);
  useEffect(() => {
    setRouterIndex(2);
  }, []);

  const openBottle = async () => {
    const response = await getLetter();
    if (response.status - 200 < 3 && response.status) {
      const letter = response.data;
      if (letter.letterInfo.imageLetterUrl) {
        letter.letterInfo.imageLetterUrl = await downloadFirebaseStorage(
          `${letter.letterInfo.imageLetterUrl}.png`
        );
      }
      setLetter(letter);
      navigate("/read");
    } else if (response.response.status === 404) {
      navigate("/noletter");
    } else {
      popErrorAlert("", "편지 가져오기 요청에 실패했습니다.");
    }
  };

  return (
    <>
      <ReadWrapper>
        <Contents>
          {/* <BGBG></BGBG> */}
          <ShakerDiv>
            <Bottle
              src={`${process.env.PUBLIC_URL}/assets/images/common/bottle_of_letter_btn.png`}
            ></Bottle>
          </ShakerDiv>
          <TextDiv delay="2.0s">편지가 떠내려왔습니다.</TextDiv>
          <TextDiv delay="3.2s">클릭하셔서 열어보세요!</TextDiv>
          <TextDiv delay="4.4s">
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
          </TextDiv>
        </Contents>
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
    transform: rotate(-15deg);
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

const appearing = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
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

const TextDiv = styled.div`
  color: #f5f5f5;
  font-size: 1.4rem;
  margin-bottom: 15px;
  opacity: 0;
  animation: ${appearing} 1.2s ${(props) => props.delay} linear forwards;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  width: 100%;
  height: auto;
`;

const BGBG = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.3;
`;

export default LetterGetPage;
