import styled from "styled-components";
import { media } from "../../utils/styleUtil";
import Checkbox from "./Checkbox";
import Button from "./Button";
import {
  letterState,
  mypageRouterState,
  readingLetterIdState,
  reportModalState,
} from "../../recoil/Atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { reportLetter } from "../../api/mypageAPI";

const ReportModalContent = () => {
  const setReportModal = useSetRecoilState(reportModalState);
  const letter = useRecoilValue(letterState);
  const routerIndex = useRecoilValue(mypageRouterState);
  const letterId = useRecoilValue(readingLetterIdState);
  let isReply = false;
  if (routerIndex === 1) {
    isReply = true;
  }
  const reportReasons = [
    "욕설 기재",
    "성희롱",
    "악의적인 콘텐츠",
    "광고성 편지",
    "특정인에 대한 부적절한 내용",
    "도배성 글",
    "기타",
  ];
  let sendingReasons = ["", "", "", "", "", "", ""];

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

      <InputDiv>
        {reportReasons.map((value, index) => (
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
          onClick={async () => {
            let reasonsString = sendingReasons.reduce(
              (pre, cur) => pre + cur,
              ""
            );
            console.log(reasonsString);
            // const response = await reportLetter(letterId, {
            //   isReply: isReply,
            //   reason: reasonsString,
            // });
            console.log(letterId);
            console.log(isReply);
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

const CheckBoxDiv = styled.div`
  margin-top: 5px;
`;

const InputDiv = styled.div`
  margin: 15px 0 20px 0;
`;

export default ReportModalContent;
