import React, { useState } from "react";
import Title from "../../components/atoms/Title";
import { AdminWrapper } from "./../../styles/Wrapper";
import Button from "./../../components/atoms/Button";
import styled from "styled-components";
import Modal from "./../../components/organisms/Modal";

const Reports = () => {
  const flexRate = [2, 4, 5, 5, 4, 2, 2];

  const [modalToggle, setModalToggle] = useState(false);

  const handleModal = () => {
    setModalToggle(!modalToggle);
  };

  return (
    <>
      {modalToggle && (
        <Modal
          titleText={"편지 내용"}
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
        ></Modal>
      )}
      <AdminWrapper>
        <Title fontSize="2.5rem" color="black" hoverBgOpacity="1">
          신고 관리 - 편지
        </Title>
        <ContentWrapper>
          <ContentLine fontWeight="bold" borderBottom="2px solid black">
            <ContentElement flex={flexRate[0]}>번호</ContentElement>
            <ContentElement flex={flexRate[1]}>신고 날짜</ContentElement>
            <ContentElement flex={flexRate[2]}>신고자</ContentElement>
            <ContentElement flex={flexRate[3]}>신고 대상</ContentElement>
            <ContentElement flex={flexRate[4]}>신고 사유</ContentElement>
            <ContentElement flex={flexRate[5]}>편지 내용</ContentElement>
            <ContentElement flex={flexRate[6]}>신고 처리</ContentElement>
          </ContentLine>
          <>
            {tmpData.map((item, index) => (
              <ContentLine key={index}>
                <ContentElement flex={flexRate[0]}>{index + 1}</ContentElement>
                <ContentElement flex={flexRate[1]}>
                  {item.reportedTime}
                </ContentElement>
                <ContentElement flex={flexRate[2]}>
                  {item.reporterNickname}
                </ContentElement>
                <ContentElement flex={flexRate[3]}>
                  {item.reportedNickname}
                </ContentElement>
                <ContentElement flex={flexRate[4]}>
                  {item.reason}
                </ContentElement>
                <ContentElement flex={flexRate[5]}>
                  <Button
                    bgColor="#49C288"
                    width="90%"
                    height="70%"
                    onClick={handleModal}
                  >
                    보기
                  </Button>
                </ContentElement>
                <ContentElement flex={flexRate[6]}>
                  <Button bgColor="#49C288" width="90%" height="70%">
                    처리
                  </Button>
                </ContentElement>
              </ContentLine>
            ))}
          </>
        </ContentWrapper>
      </AdminWrapper>
    </>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
`;

const ContentLine = styled.div`
  display: flex;
  width: 100%;
  border-bottom: ${(props) => props.borderBottom};
  font-size: 1rem;
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

const ContentElement = styled.div`
  display: flex;
  flex: ${(props) => props.flex};
  height: 4rem;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const tmpData = [
  {
    letterAccusationId: 1,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: false,
  },
  {
    letterAccusationId: 1,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: false,
  },
  {
    letterAccusationId: 1,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: false,
  },
  {
    letterAccusationId: 1,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: false,
  },
  {
    letterAccusationId: 1,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: false,
  },
  {
    letterAccusationId: 1,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: false,
  },
  {
    letterAccusationId: 1,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: true,
  },
  {
    letterAccusationId: 1,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: false,
  },
];

export default Reports;
