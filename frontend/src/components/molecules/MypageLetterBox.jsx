/**
 * @author boyeon
 */
/**
 *
 */
import React from "react";
import styled from "styled-components";
import { MypageLetter } from "../atoms/MypageLetter";

export const MypageLetterBox = () => {
  return (
    <LetterBoxDiv>
      <MypageLetter></MypageLetter>
      <MypageLetter></MypageLetter>
      <MypageLetter></MypageLetter>
      <MypageLetter></MypageLetter>
    </LetterBoxDiv>
  );
};

const LetterBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 536px;
  background-color: #f5f5f5;
`;
