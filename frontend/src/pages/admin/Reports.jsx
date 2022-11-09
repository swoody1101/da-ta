import React, { useState } from "react";
import Title from "../../components/atoms/Title";
import { AdminWrapper } from "./../../styles/Wrapper";
import Button from "./../../components/atoms/Button";
import styled from "styled-components";
import Modal from "./../../components/organisms/Modal";
import { MainSmallText, MainText } from "./../../components/atoms/Text";

const Reports = () => {
  const flexRate = [2, 4, 5, 5, 4, 2, 2];

  const [modalToggle, setModalToggle] = useState(false);

  const [reportContent, setModalContent] = useState({
    reportedNickname: null,
    content: null, // 편지텍스트 또는 이미지url
  });

  /** 편지 내용 보기 */
  const handleModal = (idx) => {
    setModalContent({
      reportedNickname: tmpData[idx].reportedNickname,
      content: tmpData[idx].content,
    });
    setModalToggle(true);
  };

  /** 신고 처리 */
  const handleProcess = (idx) => {
    console.log(idx);
  };

  return (
    <>
      {modalToggle && (
        <Modal
          titleText={"편지 내용"}
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
        >
          <ModalContentWrapper>
            <MainSmallText color="black" fontWeight="bold">
              신고 대상
            </MainSmallText>
            <ModalContentBox width="12rem" margin="1rem 0 0 0">
              {reportContent.reportedNickname}
            </ModalContentBox>
            <MainSmallText color="black" fontWeight="bold" margin="2rem 0 0 0">
              편지 내용
            </MainSmallText>
            <ModalContentBox margin="1rem 0 0 0" width="80%" height="10rem">
              {reportContent.content}
            </ModalContentBox>
          </ModalContentWrapper>
        </Modal>
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
                    onClick={() => handleModal(item.letterAccusationId)}
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

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ModalContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || "50%"};
  height: ${(props) => props.height || "4rem"};
  margin: ${(props) => props.margin};
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: scroll;
`;

const tmpData = [
  {
    letterAccusationId: 0,
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
    reporterNickname: "머리 위 오둥이",
    reportedUserId: 12551,
    reportedNickname: "사악한 고양이",
    reason: "불쾌",
    content:
      "심한 말 심한 말 심한 말\n심한 말 심한 말 심한 말심한 말 심한 말 심한 말",
    isProcessed: false,
  },
  {
    letterAccusationId: 2,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: false,
  },
  {
    letterAccusationId: 3,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: false,
  },
  {
    letterAccusationId: 4,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: false,
  },
  {
    letterAccusationId: 5,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: false,
  },
  {
    letterAccusationId: 6,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: true,
  },
  {
    letterAccusationId: 7,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: false,
  },
  {
    letterAccusationId: 8,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: true,
  },
  {
    letterAccusationId: 9,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: false,
  },
  {
    letterAccusationId: 10,
    reportedTime: "2022-01-02",
    reporterNickname: "신고 신고자",
    reportedUserId: 33,
    reportedNickname: "신고당한 당한사람",
    reason: "욕설/폭력",
    content: "대충 심한 말이 담긴 편지 내용",
    isProcessed: true,
  },
  {
    letterAccusationId: 11,
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
