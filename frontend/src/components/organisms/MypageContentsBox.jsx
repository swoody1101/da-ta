/**
 * @author boyeon
 */
/**
 *
 */
import React from "react";
import styled from "styled-components";
import { MypageLetter } from "../atoms/MypageLetter";
import { MypageSettingWeb } from "../molecules/MypageSettingWeb";
import { MypageSettingMobile } from "../molecules/MypageSettingMobile";
import { Outlet } from "react-router-dom";
import { media } from "../../utils/styleUtil";

export const MypageContentsBox = () => {
  return (
    <ContentsBoxDiv>
      <Outlet></Outlet>
    </ContentsBoxDiv>
  );
};

const ContentsBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 536px;
  background-color: #f5f5f5;

  ${media.tablet1`
    width: 100%;
    margin-top: 15px;
  `}
`;
