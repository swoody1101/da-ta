import React from "react";
import { useEffect } from "react";
import { MypageLetter } from "../../atoms/mypage/MypageLetter";
import { useSetRecoilState } from "recoil";
import { mypageRouterState } from "../../../recoil/Atoms";
import { useState } from "react";
import { collectLetterList } from "../../../api/mypageAPI";
import { popErrorAlert } from "../../../utils/sweetAlert";

export const MypageCollect = () => {
  const setSelectedIndex = useSetRecoilState(mypageRouterState);
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setSelectedIndex(0);
    callCollectLetters();
  }, []);

  const callCollectLetters = async () => {
    const response = await collectLetterList();
    if (response.status - 200 < 3 && response.status) {
      setLetters(response.data.collection);
      console.log(response.data.collection);
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
    </>
  );
};
