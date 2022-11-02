import React from "react";
import { useEffect } from "react";
import { MypageLetter } from "../../atoms/mypage/MypageLetter";
import { useRecoilState } from "recoil";
import { mypageRouterState } from "../../../recoil/Atoms";
import { useState } from "react";
import Loading from "../Loading";

export const MypageReceive = () => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(mypageRouterState);
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect( async () => {
    setSelectedIndex(1)
    //n ms이후에 api 요청으로 편지를 받아왔다고 가정
    setTimeout(() => {
      setLetters([
        {
          letterId: 11,
          letterTitle: '첫번째 받은 답장',
          userId: 2,
          userNickName: '거꾸로 타는 보일러',
          time: new Date(), 
        },
        {
          letterId: 21,
          letterTitle: '두번째 받은 답장',
          userId: 4,
          userNickName: '매우 똑똑한 아이폰 미니',
          time: new Date(),
        },
        {
          letterId: 31,
          letterTitle: '세번째 받은 답장',
          userId: 7,
          userNickName: '약간 멍청한 갤럭시 S6',
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