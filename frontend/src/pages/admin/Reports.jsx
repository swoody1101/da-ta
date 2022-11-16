import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Modal from "./../../components/organisms/Modal";
import { MainSmallText } from "./../../components/atoms/Text";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../recoil/Atoms";
import {
  accuseCancelUser,
  accuseUser,
  getReportList,
} from "./../../api/adminAPI";
import {
  popWarningAlert,
  popSuccessAlert,
  popErrorAlert,
} from "./../../utils/sweetAlert";
import ReportsTemplate from "../../components/templates/admin/ReportsTemplate";
import { ModalContentBox, ModalContentWrapper } from "../../styles/Admin";

const Reports = () => {
  const [searchParams] = useSearchParams();
  const listType = searchParams.get("listType");

  const flexRate = [2, 4, 4, 4, 4, 2, 2, 2];
  const categoryList = [
    "번호",
    "신고 날짜",
    "신고자",
    "신고 대상",
    "신고 사유",
    "내용",
    "신고 처리",
    "신고 반려",
  ];

  const [modalToggle, setModalToggle] = useState(false);
  const [modalContent, setModalContent] = useState({
    reportedNickname: null,
    content: null, // 편지텍스트 또는 이미지url
  });
  const setLoading = useSetRecoilState(loadingState);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    initList();
  }, [listType]);

  /** 신고 목록 초기화 */
  const initList = async () => {
    setLoading(true);
    setItemList([]);
    const response = await getReportList(listType);
    setLoading(false);
    if (!response || (response.status !== 200 && response.status !== 201)) {
      popErrorAlert(
        "목록 불러올 수 없음",
        "신고 목록을 불러오던 중 문제가 발생했습니다."
      );
      return;
    }

    setItemList([
      ...(listType === "letter"
        ? response.data.accusedLetters
        : response.data.accusedAnswers),
    ]);
  };

  /** [편지, 오늘의질문 답변] 내용 보기 */
  const handleModal = (item) => {
    setModalContent({
      reportedNickname: item.reportedNickname,
      content: listType === "letter" ? item.content : item.answer,
    });
    setModalToggle(true);
  };

  /** [편지, 오늘의질문 답변]신고 처리 */
  const handleAccuse = async (item) => {
    if (item.isSolved) {
      popWarningAlert("신고 처리 실패", "이미 처리된 신고입니다.");
      return;
    }

    setLoading(true);
    const response = await accuseUser(
      listType === "letter" ? item.accusedLetterId : item.accusedAnswerId,
      listType
    );
    setLoading(false);

    if (!response || (response.status !== 200 && response.status !== 201)) {
      popWarningAlert("신고 처리 실패", "신고 처리 중 문제가 발생했습니다.");
      return;
    }

    popSuccessAlert(
      "신고 처리 성공",
      "신고에 대한 경고 처리가 완료되었습니다."
    );
    initList();
  };

  /** [편지, 오늘의질문 답변]반려 처리 */
  const handleAccuseCancel = async (item) => {
    console.log(item);
    if (item.isSolved) {
      popWarningAlert("신고 처리 실패", "이미 처리된 신고입니다.");
      return;
    }

    setLoading(true);
    const response = await accuseCancelUser(
      listType === "letter" ? item.accusedLetterId : item.accusedAnswerId,
      listType
    );
    setLoading(false);

    if (!response || (response.status !== 200 && response.status !== 201)) {
      popWarningAlert("반려 처리 실패", "반려 처리 중 문제가 발생했습니다.");
      return;
    }

    popSuccessAlert(
      "반려 처리 성공",
      "신고에 대한 반려 처리가 완료되었습니다."
    );
    initList();
  };

  return (
    <>
      {modalToggle && (
        <Modal
          height={"36rem"}
          titleText={"신고 내용"}
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
        >
          <ModalContentWrapper>
            <MainSmallText color="black" fontWeight="bold">
              신고 대상
            </MainSmallText>
            <ModalContentBox width="12rem" margin="1rem 0 0 0">
              {modalContent.reportedNickname}
            </ModalContentBox>
            <MainSmallText color="black" fontWeight="bold" margin="2rem 0 0 0">
              내용
            </MainSmallText>
            <ModalContentBox margin="1rem 0 0 0" width="80%" height="10rem">
              {modalContent.content}
            </ModalContentBox>
          </ModalContentWrapper>
        </Modal>
      )}

      <ReportsTemplate
        listType={listType}
        title={
          listType === "letter" ? "신고 관리 - 편지" : "신고 관리 - 오늘의 답변"
        }
        categoryList={categoryList}
        itemList={itemList}
        handleModal={handleModal}
        handleAccuse={handleAccuse}
        handleAccuseCancel={handleAccuseCancel}
        flexRate={flexRate}
      />
    </>
  );
};

export default Reports;
