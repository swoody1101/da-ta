import React from "react";
import styled from "styled-components";
import { media } from "../../utils/styleUtil";
import Button from "../atoms/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  letterState,
  mypageRouterState,
  readingLetterIdState,
  reportModalState,
} from "../../recoil/Atoms";
import { collectLetter, tossLetter } from "../../api/letterReadAPI";
import { popSuccessAlert, popErrorAlert } from "../../utils/sweetAlert";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faShare,
  faEnvelopeOpenText,
  faTrashCan,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { collectDeleteLetter } from "../../api/mypageAPI";

const ReadButtons = ({ index }) => {
  const letterId = useRecoilValue(readingLetterIdState);
  const setReportModal = useSetRecoilState(reportModalState);
  const setLetter = useSetRecoilState(letterState);
  const routerIndex = useRecoilValue(mypageRouterState);
  const navigate = useNavigate();

  const collectBtn = async (letterId) => {
    const response = await collectLetter(letterId);
    if (response.status - 200 < 3 && response.status) {
      navigate("/");
      popSuccessAlert("", "편지를 보관함에 저장하셨습니다");
      setLetter(false);
    } else {
      popErrorAlert("", "편지 수집에 실패했습니다");
    }
  };

  const deleteBtn = async (letterId) => {
    const response = await collectDeleteLetter(letterId);
    if (response.status - 200 < 3 && response.status) {
      navigate("/");
      popSuccessAlert("", "수집한 편지를 삭제했습니다.");
      setLetter(false);
    } else {
      popErrorAlert("", "수집한 편지 삭제 요청실패");
    }
    console.log("삭제하기");
  };

  const tossBtn = async (letterId) => {
    console.log("다시 띄우기");
    const response = await tossLetter(letterId);
    if (response.status - 200 < 3 && response.status) {
      navigate("/");
      popSuccessAlert("", "편지를 다시 띄워보냈습니다.");
      setLetter(false);
    } else {
      popErrorAlert("", "요청에 실패했습니다.");
    }
    console.log(response);
  };

  const replyBtn = async (letterId) => {
    console.log("답장버튼 딸깍");
    navigate("/reply");
  };

  return (
    <ButtonDiv>
      {routerIndex ? (
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
            <FontAwesomeIcon
              icon={faPaperPlane}
              size="lg"
              style={{ margin: "0 5px 0 0" }}
            />
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
            <FontAwesomeIcon
              icon={faEnvelopeOpenText}
              size="lg"
              style={{ margin: "0 5px 0 0" }}
            />
            보관하기
          </Button>,
        ][index]
      ) : (
        <Button
          width={"180px"}
          height={"40px"}
          borderRadius={"8px"}
          mWidth={"40%"}
          mHeight={"40px"}
          mBorderRadius={"8px"}
          onClick={() => deleteBtn(letterId)}
        >
          <FontAwesomeIcon
            icon={faTrashCan}
            size="lg"
            style={{ margin: "0 5px 0 0" }}
          />
          삭제하기
        </Button>
      )}
      {routerIndex ? (
        <>
          <Button
            width={"120px"}
            height={"40px"}
            borderRadius={"8px"}
            mWidth={"40%"}
            mHeight={"40px"}
            mBorderRadius={"8px"}
            onClick={() => tossBtn(letterId)}
          >
            <FontAwesomeIcon
              icon={faShare}
              size="lg"
              style={{ margin: "0 5px 0 0" }}
            />
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
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              size="lg"
              style={{ margin: "0 5px 0 0" }}
            />
            신고하기
          </ReportButton>
        </>
      ) : (
        <Button
          width={"180px"}
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
      )}
    </ButtonDiv>
  );
};

const ButtonDiv = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-evenly;
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
