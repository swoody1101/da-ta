import styled from "styled-components";
import { media } from "../../utils/styleUtil";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { reportModalState } from "../../recoil/Atoms";
import { useSetRecoilState } from "recoil";

const ReportModalContent = () => {
  const setReportModal = useSetRecoilState(reportModalState);

  return (
    <ReportModal>
      <ReportModalTitle>신고하기</ReportModalTitle>
      <hr />
      <ReportModalWebText>불쾌한 내용의 편지를 읽으셨나요?</ReportModalWebText>
      <ReportModalWebText>
        해당하는 신고 내용을 모두 체크해 주세요.
      </ReportModalWebText>
      <ReportModalWebText>
        위반사항을 빠르게 검토하여 조치하겠습니다.
      </ReportModalWebText>
      <ReportModalMobileText>
        해당하는 내용을 체크해주세요
      </ReportModalMobileText>
      <div style={{ marginTop: "20px" }}>
        <Checkbox text={"욕설 기재"}></Checkbox>
      </div>
      <div style={{ marginTop: "5px" }}>
        <Checkbox text={"성희롱"}></Checkbox>
      </div>
      <div style={{ marginTop: "5px" }}>
        <Checkbox text={"악의적인 콘텐츠"}></Checkbox>
      </div>
      <div style={{ marginTop: "5px" }}>
        <Checkbox text={"광고성 편지"}></Checkbox>
      </div>
      <div style={{ marginTop: "5px" }}>
        <Checkbox text={"특정인에 대한 부적절한 내용"}></Checkbox>
      </div>
      <div style={{ marginTop: "5px" }}>
        <Checkbox text={"도배성 글"}></Checkbox>
      </div>
      <div style={{ margin: "5px 0 10px 0" }}>
        <Checkbox text={"기타"}></Checkbox>
      </div>
      <hr />
      <ReportModalBtnDiv>
        <Button
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
            setReportModal(false);
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

export default ReportModalContent;
