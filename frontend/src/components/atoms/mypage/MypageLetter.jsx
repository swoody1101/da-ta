/**
 * @author boyeon
 */
/**
 * @param LetterObject //ToDo: API명세서 보고 변수양식 맞추기
 */
// 나중에 API로 받아온 친구들을 props 해줘야함
import React from "react";
import styled from "styled-components";
import { media } from "../../../utils/styleUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";

export const MypageLetter = ({letterId, letterTitle, userId, userNickName, time, is_read}) => (
  <LetterDiv>
    <LetterWordsDiv>
      <LetterTitle>{letterTitle}</LetterTitle>
      <LetterDate>{`${userNickName}, ${time}`}</LetterDate>
    </LetterWordsDiv>
    {/* 아이콘이 들어갈 영역 임시 코드 Aaa */}
    <FontAwesomeIcon icon={faTriangleExclamation} style={{margin:'0 15px 0 0', color:'#F44336', cursor:'pointer'}} size="lg" onClick={() => {console.log(`${letterId}번 글을 쓴 글쓴이 아이디 ${userId}를 신고버튼`)}} />
    <FontAwesomeIcon icon={faTrashCan} style={{margin:'0', cursor:'pointer'}} size="lg" onClick={() => {console.log(`${letterId}번 글 삭제버튼`)}} />
  </LetterDiv>
);

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
    align-items: space-between;
  `}
`;

const LetterWordsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 530px;
  justify-content: center;
  align-items: center;
  margin: 0;

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
`;

const LetterDate = styled.p`
  font-size: 14px;
  width: 100%;
  height: 17px;
  color: #8f8f8f;
  margin-top: 5px;
  text-align: start;
`;

// 아이콘이 들어갈 영역 test코드
const Aaa = styled.div`
  width: 20px;
  height: 20px;
  background-color: bisque;
  margin: 0 10px 0 0;
`;
