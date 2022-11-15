import React from "react";
import { useEffect } from "react";
import { MypageLetter } from "../../atoms/mypage/MypageLetter";
import { useSetRecoilState } from "recoil";
import { mypageRouterState } from "../../../recoil/Atoms";
import { useState } from "react";
import { collectLetterList } from "../../../api/mypageAPI";
import { popErrorAlert } from "../../../utils/sweetAlert";
import styled, { keyframes } from "styled-components";

export const MypageCollect = () => {
  const setSelectedIndex = useSetRecoilState(mypageRouterState);
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(async () => {
    setSelectedIndex(0);
    callCollectLetters();
  }, []);

  const callCollectLetters = async () => {
    const response = await collectLetterList();
    if (response.status - 200 < 3 && response.status) {
      setLetters(response.data.collection);
      if (response.data.collection.length === 0) {
        setIsEmpty(true);
      }
      setIsLoading(false);
    } else {
      popErrorAlert("", "수집한 편지목록 조회에 실패하였습니다.");
    }
  };

  return (
    <>
      {isLoading
        ? null
        : letters.map((letter, index) => (
            <MypageLetter
              letter={letter}
              reload={callCollectLetters}
              key={index}
            ></MypageLetter>
          ))}
      {isEmpty ? (
        <EmptyDiv>
          <div>
            <Bottle
              src={`${process.env.PUBLIC_URL}/assets/images/common/emptybox.png`}
            ></Bottle>
            <TextDiv>수집한 편지 목록이 비어있어요..</TextDiv>
          </div>
        </EmptyDiv>
      ) : null}
    </>
  );
};
const EmptyDiv = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const shakingBottle = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(3deg);
  }
  75% {
    transform: rotate(-3deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const Bottle = styled.img`
  src: ${(props) => props.src};
  height: 30vh;
  animation: ${shakingBottle} 2s linear infinite;
`;

const TextDiv = styled.div`
  margin-top: 15px;
  font-size: 1.4rem;
`;
