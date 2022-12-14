import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Title from "../../components/atoms/Title";
import { loadingState } from "../../recoil/Atoms";
import { AdminWrapper } from "../../styles/Wrapper";
import {
  popErrorAlert,
  popSuccessAlert,
  popWarningAlert,
} from "./../../utils/sweetAlert";
import {
  ContentWrapper,
  ModalContentBox,
  ModalContentWrapper,
} from "./../../styles/Admin";
import { Calendar } from "react-calendar";
import "../../utils/Calendar.css";
import moment from "moment";
import Modal from "../../components/organisms/Modal";
import { MainSmallText } from "../../components/atoms/Text";
import Button from "../../components/atoms/Button";
import styled from "styled-components";
import {
  getAnswerList,
  getQuestion,
  getQuestionList,
  modifyQuestion,
  saveQuestion,
} from "./../../api/adminAPI";
import Input from "../../components/atoms/Input";

const TodayQuestions = () => {
  const setLoading = useSetRecoilState(loadingState);
  const [modalToggle, setModalToggle] = useState(false);

  /** 현재 월 YYYY-MM */
  const [currentMonth, setCurrentMonth] = useState(
    moment(new Date()).format("YYYY-MM")
  );

  /** 해당 월의 오늘의질문 리스트 */
  const [itemList, setItemList] = useState([]);

  /** 현재 선택된 날짜 (Date() 형식) */
  const [selectedDate, setSelectedDate] = useState(null);

  /** 모달에 들어갈 내용 */
  const [modalContent, setModalContent] = useState({
    todayQuestionId: null,
    date: null,
    question: null,
  });
  const [answerList, setAnswerList] = useState([]);

  /** 오늘의 질문 입력값 */
  const questionRef = useRef();

  useEffect(async () => {
    const formatDate = moment(selectedDate).format("YYYY-MM-DD");

    const dayQuestionInfo = itemList.find((item) => item.date === formatDate);

    // 해당 날짜에 오늘의 질문이 등록되어 있지 않은 경우
    if (dayQuestionInfo === undefined) {
      setModalContent({
        todayQuestionId: -1,
        date: formatDate,
        question: "",
      });
    }
    // 해당 날짜에 오늘의 질문이 등록되어 있는 경우
    else {
      const response = await getQuestion(dayQuestionInfo.todayQuestionId);

      if (response.status !== 200) {
        popErrorAlert(
          "",
          "오늘의 질문을 불러오던 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
        return;
      }
      setModalContent({ ...response.data });
    }

    if (dayQuestionInfo !== undefined)
      resetAnswerList(dayQuestionInfo.todayQuestionId);
    setLoading(false);
  }, [selectedDate]);

  useEffect(() => {
    resetItemList(moment(new Date()).format("YYYY-MM"));
  }, []);

  /**
   * @description 해당 월의 오늘의 질문 리스트 불러오는 함수
   * @param {} date YYYY-MM
   */
  const resetItemList = async (date) => {
    setLoading(true);
    const response = await getQuestionList(date);
    setLoading(false);

    if (response.status !== 200) {
      popErrorAlert(
        "오늘의 질문 불러올 수 없음",
        "오늘의 질문 목록을 불러오는 데 실패했습니다"
      );
      return;
    }
    setItemList([...response.data.questions]);
  };

  /**
   * @description 해당 일의 오늘의 질문 답변 리스트 불러오는 함수
   * @param {number} questionId 오늘의 질문 번호
   */
  const resetAnswerList = async (questionId) => {
    const response = await getAnswerList(questionId);

    if (!response || response.status !== 200) {
      setAnswerList([]);
      return;
    }

    setAnswerList([...response.data.answers]);
  };

  /**
   * @description 캘린더에서 날짜 클릭 시 함수
   * @param {*} pickDate Calendar에서 선택한 날짜
   * @param {*} event
   */
  const handleClickDate = async (pickDate, event) => {
    setAnswerList([]);
    setModalToggle(true);
    setSelectedDate(pickDate); // -> useEffect(selectedDate)
    setLoading(true);
  };

  /**
   * @description 오늘의 질문 [등록,수정] 클릭 시 함수
   */
  const handleSubmit = async () => {
    /** 유효성 검사 */
    if (!questionRef.current.value || questionRef.current.value.length < 1) {
      popWarningAlert("", "질문을 한 글자 이상 입력해주세요.");
      return;
    }

    let response = null;
    if (modalContent.question) {
      response = await modifyQuestion(
        modalContent.todayQuestionId,
        questionRef.current.value
      );
    } else {
      response = await saveQuestion(
        questionRef.current.value,
        modalContent.date
      );
    }

    if (response.status !== 200 && response.status !== 201) {
      popErrorAlert(
        "등록 또는 수정 실패",
        "오늘의 질문 등록 또는 수정에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
      return;
    }

    popSuccessAlert("성공", "오늘의 질문이 성공적으로 등록되었습니다.");
    resetItemList(currentMonth);
    setModalToggle(false);
  };

  /**
   * @description 캘린더에서 월 이동 시 함수, 해당하는 월의 오늘의 질문 목록을 받아온다.
   */
  const handleMonthChange = ({ action, activeStartDate, value }) => {
    const yearMonth = moment(activeStartDate).format("YYYY-MM");
    setCurrentMonth(yearMonth);
    resetItemList(yearMonth);
  };

  return (
    <>
      {modalToggle && (
        <Modal
          titleText={"질문 관리"}
          height="40rem"
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
        >
          <ModalContentWrapper>
            <MainSmallText color="black" fontWeight="bold">
              게시일
            </MainSmallText>
            <ModalContentBox width="15rem" margin="1rem 0 0 0">
              {modalContent.date}
            </ModalContentBox>
            <MainSmallText color="black" fontWeight="bold" margin="2rem 0 0 0">
              질문 내용
            </MainSmallText>
            <ModalContentBox margin="1rem 0 0 0" width="80%" height="4rem">
              <Input
                placeholder={
                  modalContent.question
                    ? modalContent.question
                    : "오늘의 질문을 입력해주세요."
                }
                width={"90%"}
                height={"90%"}
                textAlign={"center"}
                myRef={questionRef}
              />
            </ModalContentBox>
            <MainSmallText color="black" fontWeight="bold" margin="2rem 0 0 0">
              답변 목록
            </MainSmallText>
            <ModalContentBox
              flexDirection="column"
              margin="1rem 0 0 0"
              width="80%"
              height="11rem"
              justifyContent="start"
            >
              {answerList && answerList.length > 0 ? (
                answerList.map((item, index) => (
                  <Answer key={index}>
                    <AnswerWriter>{item.nickname}</AnswerWriter>
                    <AnswerContent>{item.answer}</AnswerContent>
                  </Answer>
                ))
              ) : (
                <Answer>
                  <AnswerWriter>목록이 비어있습니다.</AnswerWriter>
                </Answer>
              )}
            </ModalContentBox>
            <ButtonWrapper>
              <Button
                bgColor={modalContent.question ? "#0288D1" : "#49C288"}
                width="8rem"
                height="3rem"
                onClick={handleSubmit}
              >
                {modalContent.question ? "수정" : "등록"}
              </Button>
            </ButtonWrapper>
          </ModalContentWrapper>
        </Modal>
      )}
      <AdminWrapper>
        <Title fontSize="2.5rem" color="black" hoverBgOpacity="1">
          오늘의 질문 관리
        </Title>
        <ContentWrapper>
          <Calendar
            value={selectedDate}
            tileContent={({ date, view }) => {
              if (
                itemList.find(
                  (item) => item.date === moment(date).format("YYYY-MM-DD")
                )
              ) {
                return (
                  <>
                    <DateUnderline />
                  </>
                );
              }
            }}
            onChange={handleClickDate}
            onActiveStartDateChange={handleMonthChange}
            formatDay={(locale, date) => moment(date).format("DD")}
            minDetail="month"
            maxDetail="month"
            showNeighboringMonth={false}
            calendarType="US"
            prev2Label={`1년 전`}
            prevLabel={"이전"}
            nextLabel={"다음"}
            next2Label={"1년 후"}
          />
        </ContentWrapper>
      </AdminWrapper>
    </>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  margin: 2rem 0 0 0;
  width: 40%;
  flex-direciton: row;
  justify-content: center;
  align-items: center;
`;

const DateUnderline = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: 1s ease;
  transform: scale(1, 1);
  background-color: rgba(128, 128, 128, 0.8);
`;

const Answer = styled.div`
  display: flex;
  width: 96%;
  padding: 0.75rem 2% 0.75rem 2%;
`;

const AnswerWriter = styled.div`
  display: flex;
  flex: 2;
  height: 100%;
  font-weight: bold;
  white-space: normal;
  word-break: break-all;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: blue;
`;

const AnswerContent = styled.div`
  display: flex;
  flex: 3;
  white-space: normal;
  word-break: break-all;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export default TodayQuestions;
