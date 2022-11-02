import React from "react";
import { useEffect } from "react";
import { MypageLetter } from "../atoms/MypageLetter";

export const MypageReceive = () => {
  useEffect(() => {
    console.log('Receive')
  }, [])
  return (
    <>
      <MypageLetter></MypageLetter>
      <MypageLetter></MypageLetter>
      <MypageLetter></MypageLetter>
    </>  
  )
}