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
        <Bottle
          src={`${process.env.PUBLIC_URL}/assets/images/common/bottle_of_letter_btn.png`}
        ></Bottle>
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

const moveBottle = keyframes`
  0% {
    margin-top: -25vh;
    margin-bottom: 25vh;
    opacity: 0;
  }
  50% {
    margin-top: 0px;
    margin-bottom: 0px;
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const ReadWrapper = styled(Wrapper)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Bottle = styled.img`
  src: ${(props) => props.src};
  height: 20vh;
  animation: ${moveBottle} 2.5s 0.5s linear;
`;

export default LetterGetPage;
