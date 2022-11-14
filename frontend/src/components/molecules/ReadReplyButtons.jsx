import React from "react";
import styled from "styled-components";
import { media } from "../../utils/styleUtil";
import Button from "../atoms/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { letterState, readingLetterIdState } from "../../recoil/Atoms";
import { popSuccessAlert, popErrorAlert } from "../../utils/sweetAlert";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShare,
  faRepeat,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const ReadReplyButtons = ({ flip, setFlip }) => {
  const navigate = useNavigate();

  const deleteBtn = () => {
    flip ? setFlip(false) : setFlip(true);
  };

  return (
    <ButtonDiv>
      <Button
        width={"120px"}
        height={"40px"}
        borderRadius={"8px"}
        mWidth={"40%"}
        mHeight={"40px"}
        mBorderRadius={"8px"}
        onClick={() => deleteBtn()}
      >
        <FontAwesomeIcon
          icon={faRepeat}
          size="lg"
          style={{ margin: "0 5px 0 0" }}
        />
        뒤집기
      </Button>
      <Button
        width={"120px"}
        height={"40px"}
        borderRadius={"8px"}
        mWidth={"40%"}
        mHeight={"40px"}
        mBorderRadius={"8px"}
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon
          icon={faShare}
          size="lg"
          style={{ margin: "0 5px 0 0" }}
        />
        뒤로가기
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
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          size="lg"
          style={{ margin: "0 5px 0 0" }}
        />
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

export default ReadReplyButtons;
