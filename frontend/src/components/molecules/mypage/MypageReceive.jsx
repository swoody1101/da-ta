import React from "react";
import { useEffect } from "react";
import { MypageLetter } from "../../atoms/mypage/MypageLetter";
import { atom, useRecoilState } from "recoil";

const mypageRouterState = atom({
  key: "mypageRouterState",
  default: 0,
})

export const MypageReceive = () => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(mypageRouterState);
  useEffect(() => {
    setSelectedIndex(1)
  }, [])
  return (
    <>
      <MypageLetter></MypageLetter>
      <MypageLetter></MypageLetter>
      <MypageLetter></MypageLetter>
    </>  
  )
}