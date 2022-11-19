/**
 * @author boyeon
 */
import React from "react";
import styled from "styled-components";
import { media } from "../../../utils/styleUtil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { replyCheck } from "../../../api/mypageAPI";
import { useState } from "react";

export const MypageMenu = ({ ...props }) => {
  let isSelected = false;
  props.selectedIndex === props.menuIndex ? (isSelected = true) : null;
  const navigate = useNavigate();
  const [isNewLetter, setIsNewLetter] = useState(false);
  useEffect(async () => {
    const response = await replyCheck();
    if (!response || (response.status != 200 && response.status != 201)) {
      return;
    }
    setIsNewLetter(response.data.unreadReply);
  }, []);

  return [
    <MenuDiv onClick={() => navigate("/mypage/collect")}>
      <IconDiv>
        <Icon
          src={
            process.env.PUBLIC_URL + "/assets/images/mypage/bottleletter.png"
          }
        ></Icon>
      </IconDiv>
      <MenuName isSelected={isSelected}>수집한 편지</MenuName>
    </MenuDiv>,
    <MenuDiv onClick={() => navigate("/mypage/receive")}>
      <RedDot isNewLetter={isNewLetter} />
      <IconDiv>
        <Icon
          src={process.env.PUBLIC_URL + "/assets/images/mypage/postbox.png"}
        ></Icon>
      </IconDiv>
      <MenuName isSelected={isSelected}>받은 답장</MenuName>
    </MenuDiv>,
    <MenuDiv onClick={() => navigate("/mypage/setting")}>
      <IconDiv>
        <Icon
          src={process.env.PUBLIC_URL + "/assets/images/mypage/gear.png"}
        ></Icon>
      </IconDiv>
      <MenuName isSelected={isSelected}>개인설정</MenuName>
    </MenuDiv>,
  ][props.menuIndex];
};

const MenuDiv = styled.div`
  width: 100%;
  height: 144px;
  background-color: #f5f5f5;
  cursor: pointer;

  ${media.tablet1`
    height: 44px;
    background-color: #ffffff;
  `}
  @media screen and (max-height: 700px) {
    height: 44px;
  }
`;

const IconDiv = styled.div`
  width: 100px;
  height: 100px;

  ${media.tablet1`
    display: none;
  `}
  @media screen and (max-height: 700px) {
    display: none;
  }
`;

const Icon = styled.img`
  src: ${(props) => props.src};
  height: 100%;
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

const RedDot = styled.div`
  position: relative;
  margin: 0;
  width: 5px;
  height: 5px;
  background-color: red;
  border-radius: 50%;
  top: 50%;
  left: calc(50% + 50px);
  display: ${(props) => (props.isNewLetter ? null : "none")};
`;
