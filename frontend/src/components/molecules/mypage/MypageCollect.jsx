import React from "react";
import { useEffect } from "react";
import { MypageLetter } from "../../atoms/mypage/MypageLetter";
import { useSetRecoilState } from "recoil";
import { mypageRouterState } from "../../../recoil/Atoms";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { loadingState } from "../../../recoil/Atoms";
import { collectLetterList } from "../../../api/mypageAPI";

export const MypageCollect = () => {
  const setSelectedIndex = useSetRecoilState(mypageRouterState);
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  useEffect(async () => {
    setIsLoading(true);
    setSelectedIndex(0);

    setTimeout(() => {
      setLetters([
        {
          id: 0,
          title: "첫번째 수집 편지",
          writerId: 1,
          writerNickname: "법정에 선 삼겹살 스테이크",
          writtenDate: new Date(),
        },
        {
          id: 0,
          title: "두번째 수집 편지",
          writerId: 1,
          writerNickname: "노려보는 레쓰비 마일드 커피",
          writtenDate: new Date(),
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {isLoading
        ? null
        : letters.map((letter, index) => (
            <MypageLetter letter={letter} key={index}></MypageLetter>
          ))}
    </>
  );
};
