import React from "react";
import styled from "styled-components";
import { BubbleBtn } from "../atoms/BubbleBtn";
import { media } from "../../utils/styleUtil";

const ReadButtons = ({ index }) => {
  return (
    <ButtonDiv>
      {
        [
          <BubbleBtn1 width={"13vh"} height={"13vh"} color={"white"}>
            답장하기
          </BubbleBtn1>,
          <BubbleBtn1 width={"13vh"} height={"13vh"} color={"white"}>
            보관하기
          </BubbleBtn1>,
          <BubbleBtn1 width={"13vh"} height={"13vh"} color={"white"}>
            삭제하기
          </BubbleBtn1>,
        ][index]
      }
      <BubbleBtn1 width={"13vh"} height={"13vh"} color={"white"}>
        다시 띄우기
      </BubbleBtn1>
      <BubbleBtn2 width={"13vh"} height={"13vh"} color={"white"}>
        신고하기
      </BubbleBtn2>
    </ButtonDiv>
  );
};

const ButtonDiv = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: space-between;
  height: 16vh;
  width: 600px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
  ${media.phone`
    height: 9vh;
  `}
`;

const BubbleBtn1 = styled(BubbleBtn)`
  ${media.phone`
    width: 40%;
    height: 40px;
    border-radius: 8px;
  `}
`;

const BubbleBtn2 = styled(BubbleBtn)`
  ${media.phone`
    display: none;
  `}
`;

export default ReadButtons;
