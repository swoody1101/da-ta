import React from "react";
import { useEffect } from "react";
import { MypageLetter } from "../../atoms/mypage/MypageLetter";
import { useSetRecoilState } from "recoil";
import { mypageRouterState } from "../../../recoil/Atoms";
import { useState } from "react";
import { receiveLetterList } from "../../../api/mypageAPI";
import { popErrorAlert } from "../../../utils/sweetAlert";

export const MypageReceive = () => {
  const setSelectedIndex = useSetRecoilState(mypageRouterState);
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setSelectedIndex(1);
    callReceiveLetters();
  }, []);

  const callReceiveLetters = async () => {
    const response = await receiveLetterList();
    if (response.status - 200 < 3 && response.status) {
      setLetters(response.data.replies);
      console.log(response.data.replies);
      setIsLoading(false);
    } else {
      popErrorAlert("", "답장받은 편지목록 조회에 실패하였습니다.");
    }
  };

  return (
    <>
      {isLoading
        ? null
        : letters.map((letter, index) => (
            <MypageLetter
              letter={letter}
              key={index}
              reload={callReceiveLetters}
            ></MypageLetter>
          ))}
    </>
  );
};
