import React from "react";
import { useEffect } from "react";
import { MypageLetter } from "../../atoms/mypage/MypageLetter";
import { useSetRecoilState } from "recoil";
import { mypageRouterState } from "../../../recoil/Atoms";
import { useState } from "react";
import { collectLetterList } from "../../../api/mypageAPI";

export const MypageCollect = () => {
  const setSelectedIndex = useSetRecoilState(mypageRouterState);
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setSelectedIndex(0);
    const response = await collectLetterList();
    if (response.status - 200 < 3 && response.status) {
      setLetters(response.data.collection);
      setIsLoading(false);
    } //TODO: 예외처리 구문 추가
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
