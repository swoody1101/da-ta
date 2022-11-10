import React from "react";
import { useEffect } from "react";
import { MypageLetter } from "../../atoms/mypage/MypageLetter";
import { useSetRecoilState } from "recoil";
import { mypageRouterState } from "../../../recoil/Atoms";
import { useState } from "react";
import { receiveLetterList } from "../../../api/mypageAPI";

export const MypageReceive = () => {
  const setSelectedIndex = useSetRecoilState(mypageRouterState);
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setSelectedIndex(1);
    const response = await receiveLetterList();
    if (response.status - 200 < 3 && response.status) {
      setLetters(response.data.collection);
      setIsLoading(true);
    }
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
