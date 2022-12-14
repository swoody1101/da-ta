/**
 * @author boyeon
 */
/**
 *
 */
import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { media } from "../../../utils/styleUtil";

export const MypageContentsBox = () => (
  <ContentsBoxDiv>
    <Outlet></Outlet>
  </ContentsBoxDiv>
);

const ContentsBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 90%;
  background-color: #f5f5f5;
  overflow-y: auto;

  ${media.tablet1`
    width: 100%;
    margin-top: 15px;
  `}
`;
