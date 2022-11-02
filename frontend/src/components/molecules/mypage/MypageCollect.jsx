import React from "react";
import { useEffect } from "react";
import { MypageLetter } from "../../atoms/mypage/MypageLetter";
import { useRecoilState } from "recoil";
import { mypageRouterState } from "../../../recoil/Atoms";
import { useState } from "react";
import Loading from "../Loading";

export const MypageCollect = () => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(mypageRouterState);
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect( async () => {
    setSelectedIndex(0)
    //n ms이후에 api 요청으로 편지를 받아왔다고 가정
    setTimeout(() => {
      setLetters([
        {
          letterId: 0,
          letterTitle: '첫번째 수집 편지',
          userId: 1,
          userNickName: '법정에 선 삼겹살 스테이크',
          time: new Date(), 
        },
        {
          letterId: 1,
          letterTitle: '두번째 수집 편지',
          userId: 3,
          userNickName: '노려보는 레쓰비 마일드 커피',
          time: new Date(),
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])
  return (
    <>
      {
        isLoading ? <Loading /> : letters.map((letter, index) => <MypageLetter letter={letter} key={index}></MypageLetter>)
      }
    </> 
  )
}