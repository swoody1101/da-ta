import React from "react";
import styled from "styled-components";
import { media } from "../../utils/styleUtil";
import Button from "../atoms/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { readingLetterIdState, reportModalState } from "../../recoil/Atoms";
import { tossLetter } from "../../api/letterReadAPI";

const ReadButtons = ({ index }) => {
  const letterId = useRecoilValue(readingLetterIdState);
  const setReportModal = useSetRecoilState(reportModalState);

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
            onClick={() => console.log("답장하기")}
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
            onClick={() => console.log("보관하기")}
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
            onClick={() => console.log("삭제하기")}
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
        onClick={async () => {
          console.log("다시 띄우기");
          // const response = await tossLetter(letterId);
        }}
      >
        다시 띄우기
      </Button>
      <ReportButton
        width={"120px"}
        height={"120px"}
        borderRadius={"50%"}
        mWidth={"40%"}
        mHeight={"40px"}
        mBorderRadius={"8px"}
        onClick={() => setReportModal(true)}
      >
        신고하기
      </ReportButton>
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

const ReportButton = styled(Button)`
  ${media.phone`
    display: none;
  `}
`;

export default ReadButtons;
