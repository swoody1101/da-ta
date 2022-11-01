import React from "react";
import styled from "styled-components";

export const MypageMenu = () => {
  return [
    <MenuDiv>
      <img
        src={process.env.PUBLIC_URL + "assets/images/mypage/bottleletter.png"}
        height="100px"
      ></img>
      <MenuName isSelected={true}>수집한 편지</MenuName>
    </MenuDiv>,
    <MenuDiv>
      <img
        src={process.env.PUBLIC_URL + "assets/images/mypage/postbox.png"}
        height="100px"
      ></img>
      <MenuName>받은 답장</MenuName>
    </MenuDiv>,
    <MenuDiv>
      <img
        src={process.env.PUBLIC_URL + "assets/images/mypage/gear.png"}
        height="100px"
      ></img>
      <MenuName>개인설정</MenuName>
    </MenuDiv>,
  ];
};

const MenuDiv = styled.div`
  width: 200px;
  height: 144px;
  background-color: #f5f5f5;
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
