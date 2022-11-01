/**
 * @author boyeon
 */
/**
 *
 */
import React from "react";
import styled from "styled-components";
//TODO: 새로 온 메일이 있을 경우 받은 답장에 빨간 점 표시
//      선택된 메뉴에 파란 줄 표시
//      클릭 시 메뉴 변경 함수
//      현재 선택 메뉴 index를 props 받아서 분기처리

export const MypageMenu = ({ ...props }) => {
  let isSelected = false;
  props.selectedIndex === props.menuIndex ? (isSelected = true) : null;

  return [
    <MenuDiv>
      <img
        src={process.env.PUBLIC_URL + "assets/images/mypage/bottleletter.png"}
        height="100px"
      ></img>
      <MenuName isSelected={isSelected}>수집한 편지</MenuName>
    </MenuDiv>,
    <MenuDiv>
      <img
        src={process.env.PUBLIC_URL + "assets/images/mypage/postbox.png"}
        height="100px"
      ></img>
      <MenuName isSelected={isSelected}>받은 답장</MenuName>
    </MenuDiv>,
    <MenuDiv>
      <img
        src={process.env.PUBLIC_URL + "assets/images/mypage/gear.png"}
        height="100px"
      ></img>
      <MenuName isSelected={isSelected}>개인설정</MenuName>
    </MenuDiv>,
  ][props.menuIndex];
};

const MenuDiv = styled.div`
  width: 200px;
  height: 144px;
  background-color: #f5f5f5;
  cursor: pointer;
`;

const MenuName = styled.p`
  display: flex;
  font-size: 20px;
  color: ${(props) => (props.isSelected ? "#4FC3F7" : "black")};
  width: 100%;
  height: 44px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
