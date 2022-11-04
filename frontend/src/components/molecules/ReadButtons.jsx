import React from "react";
import styled from "styled-components";
import { media } from "../../utils/styleUtil";
import Button from "../atoms/Button";

const ReadButtons = ({ index }) => {
  return (
    <ButtonDiv>
      {
        [
          <Button
            width={"120px"}
            height={"120px"}
            borderRadius={"50%"}
            mWidth={"40%"}
            mHeight={"40px"}
            mBorderRadius={"8px"}
          >
            답장하기
          </Button>,
          <Button
            width={"120px"}
            height={"120px"}
            borderRadius={"50%"}
            mWidth={"40%"}
            mHeight={"40px"}
            mBorderRadius={"8px"}
          >
            보관하기
          </Button>,
          <Button
            width={"120px"}
            height={"120px"}
            borderRadius={"50%"}
            mWidth={"40%"}
            mHeight={"40px"}
            mBorderRadius={"8px"}
          >
            삭제하기
          </Button>,
        ][index]
      }
      <Button
        width={"120px"}
        height={"120px"}
        borderRadius={"50%"}
        mWidth={"40%"}
        mHeight={"40px"}
        mBorderRadius={"8px"}
      >
        다시 띄우기
      </Button>
      <DeleteButton
        width={"120px"}
        height={"120px"}
        borderRadius={"50%"}
        mWidth={"40%"}
        mHeight={"40px"}
        mBorderRadius={"8px"}
      >
        삭제하기
      </DeleteButton>
    </ButtonDiv>
  );
};

const ButtonDiv = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  align-items: space-between;
  height: 140px;
  width: 500px;

  ${media.phone`
    width: 100%;
    height: 9vh;
    justify-content: space-evenly;
  `}
`;

const DeleteButton = styled(Button)`
  ${media.phone`
    display: none;
  `}
`;

export default ReadButtons;
