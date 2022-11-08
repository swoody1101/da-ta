import React from "react";
import { useEffect } from "react";
import { MypageLetter } from "../../atoms/mypage/MypageLetter";
import { useSetRecoilState } from "recoil";
import { mypageRouterState } from "../../../recoil/Atoms";
import { useState } from "react";
import Loading from "../Loading";
import { collectLetter } from "../../../api/letterReadAPI";

export const MypageReceive = () => {
  const setSelectedIndex = useSetRecoilState(mypageRouterState);
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    setSelectedIndex(1);
    //setLetters(collectLetter());

    setTimeout(() => {
      setLetters([
        {
          id: 11,
          title: "첫번째 받은 답장",
          writerId: 2,
          writerNickname: "거꾸로 타는 보일러",
          writtenDate: new Date(),
        },
        {
          id: 21,
          title: "두번째 받은 답장",
          writerId: 4,
          writerNickname: "매우 똑똑한 아이폰 미니",
          writtenDate: new Date(),
        },
        {
          id: 31,
          title: "세번째 받은 답장",
          writerId: 7,
          writerNickname: "약간 멍청한 갤럭시 S6",
          writtenDate: new Date(),
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        letters.map((letter, index) => (
          <MypageLetter letter={letter} key={index}></MypageLetter>
        ))
      )}
    </>
  );
};
