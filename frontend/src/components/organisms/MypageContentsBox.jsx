/**
 * @author boyeon
 */
/**
 *
 */
import React from "react";
import styled from "styled-components";
import { MypageLetter } from "../atoms/MypageLetter";
import { MypageSetting } from "../molecules/MypageSetting";

export const MypageContentsBox = () => {
  return (
    <ContentsBoxDiv>
      <MypageLetter></MypageLetter>
      <MypageSetting></MypageSetting>
    </ContentsBoxDiv>
  );
};

const ContentsBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 536px;
  background-color: #f5f5f5;

  @media screen and (max-width: 900px) {
    width: 100%;
    margin-top: 15px;
  }
`;
