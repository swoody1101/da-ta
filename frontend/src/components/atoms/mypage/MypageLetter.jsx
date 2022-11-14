/**
 * @author boyeon
 */
/**
 * @param LetterObject
 */
import React, { useEffect } from "react";
import styled from "styled-components";
import { media } from "../../../utils/styleUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  letterState,
  mypageRouterState,
  reportModalState,
} from "../../../recoil/Atoms";
import { readingLetterIdState } from "../../../recoil/Atoms";
import {
  collectDeleteLetter,
  collectDetail,
  replyDeleteLetter,
  replyDetail,
} from "../../../api/mypageAPI";
import { popErrorAlert, popSuccessAlert } from "../../../utils/sweetAlert";
import { downloadFirebaseStorage } from "../../../utils/firebaseStorage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DateToString = (writtenDate) => {
  const ToDate = new Date(writtenDate);
  return `${ToDate.getFullYear()}년 ${
    ToDate.getMonth() + 1
  }월 ${ToDate.getDate()}일`;
};

export const MypageLetter = ({ letter, reload }) => {
  const navigate = useNavigate();
  const setReportModal = useSetRecoilState(reportModalState);
  const setReadingLetterId = useSetRecoilState(readingLetterIdState);
  const mypageRouterIndex = useRecoilValue(mypageRouterState);
  const setLetter = useSetRecoilState(letterState);
  const writtenTime = DateToString(letter.writtenDate);
  const [display, setDisplay] = useState("block");

  const readLetter = async (index, letterId) => {
    if (index === 0) {
      // routerIndex=0 인 경우 => 수집한 편지인 경우
      const response = await collectDetail(letterId);
      if (response.status - 200 < 3 && response.status) {
        const letter = response.data;
        setReadingLetterId(letterId);
        if (letter.letterInfo.imageLetterUrl) {
          letter.letterInfo.imageLetterUrl = await downloadFirebaseStorage(
            `${letter.letterInfo.imageLetterUrl}.png`
          );
        }
        setLetter(letter);
        navigate("/read");
      } else {
        popErrorAlert("", "수집한 편지 읽기 요청실패");
      }
    } else {
      // routerIndex=0 이 아닌 경우 => 답장받은 편지인 경우
      const response = await replyDetail(letterId);
      if (response.status - 200 < 3 && response.status) {
        const letter = response.data;
        setReadingLetterId(letterId);
        console.log(letter);
        if (letter.originLetterInfo.imageLetterUrl) {
          letter.originLetterInfo.imageLetterUrl =
            await downloadFirebaseStorage(
              `${letter.originLetterInfo.imageLetterUrl}.png`
            );
        }
        setLetter(letter);
        navigate("/replyread");
      } else {
        popErrorAlert("", "답장한 편지 읽기 요청실패");
      }
    }
  };

  useEffect(() => {
    if (mypageRouterIndex == 0) {
      setDisplay("none");
    }
  }, []);

  const deleteLetter = async (index, letterId) => {
    if (index === 0) {
      // routerIndex=0 인 경우 => 수집한 편지인 경우
      const response = await collectDeleteLetter(letterId);
      if (response.status - 200 < 3 && response.status) {
        popSuccessAlert("", "수집한 편지를 삭제했습니다.");
        reload();
      } else {
        popErrorAlert("", "수집한 편지 삭제 요청실패");
      }
    } else {
      // routerIndex=0 이 아닌 경우 => 답장받은 편지인 경우
      const response = await replyDeleteLetter(letterId);
      if (response.status - 200 < 3 && response.status) {
        popSuccessAlert("", "답장한 편지를 삭제했습니다.");
      } else {
        popErrorAlert("", "요청실패");
      }
    }
  };

  return (
    <LetterDiv>
      <LetterWordsDiv>
        <LetterTitle
          onClick={() => {
            readLetter(mypageRouterIndex, letter.id);
          }}
        >
          {letter.title}
        </LetterTitle>
        <LetterDate>{`${letter.writerNickname}, ${writtenTime}`}</LetterDate>
        <LetterDateWeb>{`${letter.writerNickname}`}</LetterDateWeb>
        <LetterDateWeb>{`${writtenTime}`}</LetterDateWeb>
      </LetterWordsDiv>
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        style={{
          margin: "0 15px 0 0",
          color: "#F44336",
          cursor: "pointer",
          display: display,
        }}
        size="lg"
        onClick={() => {
          setReportModal(true);
          setReadingLetterId(letter.id);
          console.log(
            `${letter.id}번 글을 쓴 글쓴이 아이디 ${letter.writerId}를 신고버튼`
          );
        }}
      />
      <FontAwesomeIcon
        icon={faTrashCan}
        style={{ margin: "0 15px 0 0", cursor: "pointer" }}
        size="lg"
        onClick={() => {
          deleteLetter(mypageRouterIndex, letter.id);
        }}
      />
    </LetterDiv>
  );
};

const LetterDiv = styled.div`
  display: flex;
  height: 70px;
  width: 620px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 24px;

  ${media.tablet1`
    width: 90%;
    height: 87px;
    align-items: space-between;
  `}
`;

const LetterWordsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 530px;
  justify-content: center;
  align-items: center;
  margin: 10px 0 10px 0;

  ${media.tablet1`
    width: 80%;
    margin-left: 15px;
  `}
`;

const LetterTitle = styled.p`
  font-size: 20px;
  width: 100%;
  height: 20px;
  text-align: start;
  cursor: pointer;
  ${media.tablet1`
    margin-bottom: 8px;
  `}
`;

const LetterDate = styled.p`
  font-size: 14px;
  width: 100%;
  height: 17px;
  color: #8f8f8f;
  margin-top: 5px;
  text-align: start;

  ${media.tablet1`
    display: none;
  `}
`;

const LetterDateWeb = styled(LetterDate)`
  display: none;
  margin: 0;
  ${media.tablet1`
    display: inline;
  `}
`;
