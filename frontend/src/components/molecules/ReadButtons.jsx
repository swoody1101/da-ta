import React from "react";
import styled from "styled-components";
import { media } from "../../utils/styleUtil";
import Button from "../atoms/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  letterState,
  readingLetterIdState,
  reportModalState,
} from "../../recoil/Atoms";
import { collectLetter, tossLetter } from "../../api/letterReadAPI";
import { popSuccessAlert, popErrorAlert } from "../../utils/sweetAlert";
import { useNavigate } from "react-router-dom";

const ReadButtons = ({ index }) => {
  const letterId = useRecoilValue(readingLetterIdState);
  const setReportModal = useSetRecoilState(reportModalState);
  const setLetter = useSetRecoilState(letterState);
  const navigate = useNavigate();

  const collectBtn = async (letterId) => {
    const response = await collectLetter(letterId);
    if (response.status - 200 < 3 && response.status) {
      navigate("/");
      popSuccessAlert("", "편지를 보관함에 저장하셨습니다");
      setLetter({});
    } else {
      popErrorAlert("", "편지 수집에 실패했습니다");
    }
    console.log(response);
  };

  const deleteBtn = async (letterId) => {
    console.log("삭제하기");
  };

  const tossBtn = async (letterId) => {
    console.log("다시 띄우기");
    const response = await tossLetter(letterId);
    // 따로 페이지로 뺄 예정
    // 편지 날아가는? 떠내려가는? 애니메이션이 있는 페이지로 보낼 예정
    if (response.status - 200 < 3 && response.status) {
      navigate("/");
      popSuccessAlert("", "편지를 다시 띄워보냈습니다.");
      setLetter({});
    } else {
      popErrorAlert("", "요청에 실패했습니다.");
    }
    console.log(response);
  };

  const replyBtn = async (letterId) => {
    console.log("답장버튼 딸깍");
  };

  return (
    <ButtonDiv>
      {
        [
          <Button
            width={"120px"}
            height={"40px"}
            borderRadius={"8px"}
            mWidth={"40%"}
            mHeight={"40px"}
            mBorderRadius={"8px"}
            onClick={() => replyBtn(letterId)}
          >
            답장하기
          </Button>,
          <Button
            width={"120px"}
            height={"40px"}
            borderRadius={"8px"}
            mWidth={"40%"}
            mHeight={"40px"}
            mBorderRadius={"8px"}
            onClick={() => collectBtn(letterId)}
          >
            보관하기
          </Button>,
          <Button
            width={"120px"}
            height={"40px"}
            borderRadius={"8px"}
            mWidth={"40%"}
            mHeight={"40px"}
            mBorderRadius={"8px"}
            onClick={() => deleteBtn(letterId)}
          >
            삭제하기
          </Button>,
        ][index]
      }
      <Button
        width={"120px"}
        height={"40px"}
        borderRadius={"8px"}
        mWidth={"40%"}
        mHeight={"40px"}
        mBorderRadius={"8px"}
        onClick={() => tossBtn(letterId)}
      >
        다시 띄우기
      </Button>
      <ReportButton
        width={"120px"}
        height={"40px"}
        borderRadius={"8px"}
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
  height: 60px;
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
