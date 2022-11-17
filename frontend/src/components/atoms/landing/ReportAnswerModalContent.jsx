import React from "react";
import styled from "styled-components";
import { REPORT_REASONS } from "../../../constants/Variables";
import { media } from "../../../utils/styleUtil";
import { popErrorAlert, popSuccessAlert } from "../../../utils/sweetAlert";
import Button from "../Button";
import Checkbox from "../Checkbox";
import { todayAnswerAccusation } from "./../../../api/questionAccusationAPI";

const ReportAnswerModalContent = ({ setModalToggle, answerId }) => {
  let sendingReasons = ["", "", "", "", "", "", ""];

  const handleReportAnswer = async () => {
    let reasonsString = sendingReasons.reduce((pre, cur) => pre + cur, "");
    if (reasonsString) {
      reasonsString = reasonsString.slice(0, -2);
      const response = await todayAnswerAccusation(answerId, {
        reason: reasonsString,
      });
      console.log(response);

      if (response && response.status - 200 < 3) {
        popSuccessAlert("", "신고가 접수되었습니다.");
        setModalToggle(false);
      } else {
        popErrorAlert("", "신고내역 전송에 실패했습니다.");
      }
    } else {
      popErrorAlert("", "신고 내용을 기입해주세요.");
    }
  };

  return (
    <ReportModal>
      <ReportModalTitle>신고하기</ReportModalTitle>
      <hr />
      <ReportModalWebText>불쾌한 내용의 답변을 읽으셨나요?</ReportModalWebText>
      <ReportModalWebText>
        해당하는 신고 내용을 모두 체크해 주세요.
      </ReportModalWebText>
      <ReportModalWebText>
        위반사항을 빠르게 검토하여 조치하겠습니다.
      </ReportModalWebText>
      <ReportModalMobileText>
        해당하는 내용을 체크해주세요
      </ReportModalMobileText>

      <InputDiv>
        {REPORT_REASONS.map((value, index) => (
          <CheckBoxDiv key={index}>
            <Checkbox
              text={value}
              onCheckHandler={(e) => {
                e.target.checked
                  ? (sendingReasons[index] = `${value}, `)
                  : (sendingReasons[index] = "");
              }}
            ></Checkbox>
          </CheckBoxDiv>
        ))}
      </InputDiv>
      <hr />
      <ReportModalBtnDiv>
        <Button
          onClick={() => {
            handleReportAnswer(answerId);
          }}
          width={"30%"}
          height={"30px"}
          color={"black"}
          fontSize={"18px"}
          borderRadius={"15px"}
        >
          신고하기
        </Button>
        <Button
          onClick={() => {
            setModalToggle(false);
          }}
          width={"30%"}
          height={"30px"}
          color={"black"}
          fontSize={"18px"}
          borderRadius={"15px"}
        >
          취소하기
        </Button>
      </ReportModalBtnDiv>
    </ReportModal>
  );
};

const ReportModal = styled.div`
  width: 90%;
  overflow-y: auto;
  z-index: 1005;
`;

const ReportModalTitle = styled.div`
  font-size: 24px;
  text-align: left;
  margin-bottom: 10px;
`;

const ReportModalWebText = styled.p`
  margin-top: 10px;
  text-align: left;
  ${media.phone`
    display: none;
  `}
`;

const ReportModalMobileText = styled.p`
  margin-top: 10px;
  text-align: left;
  display: none;
  ${media.phone`
    display: block;
  `}
`;

const ReportModalBtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  width: 90%;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const CheckBoxDiv = styled.div`
  margin-top: 5px;
`;

const InputDiv = styled.div`
  margin: 15px 0 20px 0;
`;

export default ReportAnswerModalContent;
