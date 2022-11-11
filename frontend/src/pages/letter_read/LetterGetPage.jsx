import React from "react";
import { useState } from "react";
import BackgroundVideo from "../../components/atoms/BackgroundVideo";
import { Wrapper } from "../../styles/Wrapper";
import Button from "../../components/atoms/Button";
import styled from "styled-components";
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
    setRouterIndex(0);
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
    // setLetter({
    //   writerId: 1111,
    //   writerNickname: "이ㅣ",
    //   replyOption: false,
    //   letterInfo: {
    //     letterId: 3,
    //     title: null,
    //     content: null,
    //     imageLetterUrl:
    //       "https://firebasestorage.googleapis.com/v0/b/da-ta-8db6c.appspot.com/o/drawings/1668043144153.png?alt=media",
    //     backgroundId: 0,
    //     fontId: 0,
    //     writtenDate: new Date(),
    //   },
    // });
    // navigate("/read");
  };

  return (
    <>
      <ReadWrapper>
        나중에 애니메이션 들어갈 예정
        <Button
          width={"300px"}
          height={"150px"}
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

const ReadWrapper = styled(Wrapper)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default LetterGetPage;
