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

const LetterGetPage = () => {
  const navigate = useNavigate();
  const setRouterIndex = useSetRecoilState(mypageRouterState);
  const setLetter = useSetRecoilState(letterState);
  let [blur, SetBlur] = useState(true);
  useEffect(() => {
    setRouterIndex(0);
  }, []);

  const openBottle = async () => {
    const response = await getLetter();
    console.log(response);
    // if (response.status - 200 < 2) {
    //   setLetter(response.data);
    //   navigate("/read");
    // }
    setLetter({
      writerId: 7,
      writerName: "길가다 5만원을 주운 후라이드치킨",
      replyOption: true,
      floatLetterId: 0,
      letterInfo: {
        letterId: 10,
        title: "메밀꽃 필 무렵",
        content: "여름장이란 애시당초에 글러서 해는 아직 중천에 있건만",
        imageLetterUrl:
          // process.env.PUBLIC_URL + "/assets/images/mypage/gear.png",
          null,
        backgroundId: 2,
        fontId: 1,
        createTime: new Date(),
      },
    });
    navigate("/read");
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
