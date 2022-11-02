/**
 * @author boyeon
 */
/**
 *
 */
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { MypageMenu } from "../atoms/MypageMenu";

export const MenuBar = () => {
  // Todo: TestBoyeon 페이지의 selectedIndex와 같이 전역으로 관리하기
  let [selectedIndex, setSelectedIndex] = useState(0);

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

  @media screen and (max-width: 900px) {
    width: 100%;
    flex-direction: row;
    margin-top: 6rem;
    height: 44px;
    background-color: #ffffff;
    border-bottom: 2px solid #d9d9d9;
    border-right: none;
  }
`;
