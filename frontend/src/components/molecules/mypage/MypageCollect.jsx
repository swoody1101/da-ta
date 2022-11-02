import React from "react";
import { useEffect } from "react";
import { MypageLetter } from "../../atoms/mypage/MypageLetter";
import { atom, useRecoilState } from "recoil";

const mypageRouterState = atom({
  key: "mypageRouterState",
  default: 0,
})

export const MypageCollect = () => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(mypageRouterState);
  useEffect(() => {
    setSelectedIndex(0)
  }, [])
  return (
    <>
      <MypageLetter></MypageLetter>
      <MypageLetter></MypageLetter>
    </>  
  )
}