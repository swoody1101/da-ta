/**
 * @author boyeon
 */
import React from "react";
import styled from "styled-components";
import { MypageMenu } from "../../atoms/mypage/MypageMenu";
import { media } from "../../../utils/styleUtil";
import { atom, useRecoilState } from "recoil";
import { useEffect } from "react";
import { mypageRouterState } from "../../../recoil/Atoms";

export const MypageMenuBar = () => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(mypageRouterState);
  useEffect(() => {
    console.log(selectedIndex)
  }, [])

  return (
    <MenuBarDiv>
      {[0, 1, 2].map((a, i) => (
        <MypageMenu
          menuIndex={a}
          selectedIndex={selectedIndex}
          key={i}
          onClick={() => {
            setSelectedIndex(a);
          }}
        ></MypageMenu>
      ))}
    </MenuBarDiv>
  );
};

const MenuBarDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  height: 536px;
  background-color: #f5f5f5;
  border-right: 2px solid gray;

  ${media.tablet1`
    width: 100%;
    flex-direction: row;
    margin-top: 6rem;
    height: 44px;
    background-color: #ffffff;
    border-bottom: 2px solid #d9d9d9;
    border-right: none;
  `}
`;
