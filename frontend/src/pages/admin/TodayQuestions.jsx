import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Title from "../../components/atoms/Title";
import { loadingState } from "../../recoil/Atoms";
import { AdminWrapper } from "../../styles/Wrapper";
import { popWarningAlert } from "./../../utils/sweetAlert";
import { ContentWrapper, ModalContentBox, ModalContentWrapper } from "./../../styles/Admin";
import { Calendar } from "react-calendar";
import "../../utils/Calendar.css";
import moment from "moment";
import Modal from "../../components/organisms/Modal";
import { MainSmallText } from "../../components/atoms/Text";
import Button from "../../components/atoms/Button";
import styled from "styled-components";

const TodayQuestions = () => {
	const setLoading = useSetRecoilState(loadingState);
	const [modalToggle, setModalToggle] = useState(true);
	const [itemList, setItemList] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());

	useEffect(() => {
		console.log(selectedDate);
		console.log(moment(selectedDate).format("YYYY년 MM월 DD일"));
	}, [selectedDate]);

	useEffect(() => {
		setLoading(true);
		``;
		// const response = 오늘의 질문 (월);
		setLoading(false);

		// if (response.status !== 200) {
		// 	popWarningAlert("오늘의 질문 조회 실패", "오늘의 질문을 불러오던 중 문제가 발생했습니다.");
		// 	return;
		// }
		// setItemList([...response.data.questions]);
	}, []);

	/**
	 * @description 캘린더에서 날짜 클릭 시 함수
	 * @param {*} pickDate Calendar에서 선택한 날짜
	 * @param {*} event
	 */
	const handleClickDate = (pickDate, event) => {
		setSelectedDate(pickDate);
	};

	const tmpHandle = (value, event) => {
		console.log("hh" + value);
	};

	return (
		<>
			{modalToggle && (
				<Modal titleText={"질문 관리"} height="36rem" modalToggle={modalToggle} setModalToggle={setModalToggle}>
					<ModalContentWrapper>
						<MainSmallText color="black" fontWeight="bold">
							게시 (예정)일
						</MainSmallText>
						<ModalContentBox width="15rem" margin="1rem 0 0 0">
							2022년 10월 23일 (예시)
						</ModalContentBox>
						<MainSmallText color="black" fontWeight="bold" margin="2rem 0 0 0">
							질문 내용
						</MainSmallText>
						<ModalContentBox margin="1rem 0 0 0" width="80%" height="10rem">
							당신의 보물은 무엇인가요? 내용 없으면 input창(예시)
						</ModalContentBox>
						<ButtonWrapper>
							<Button bgColor="#DB7878" width="8rem" height="3rem" onClick={() => console.log("")}>
								삭제
							</Button>
							<Button bgColor="#49C288" width="8rem" height="3rem" onClick={() => console.log("")}>
								등록
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
						onChange={handleClickDate}
						onViewChange={tmpHandle}
						onClickDecade={tmpHandle}
						onClickMonth={tmpHandle}
						onDrillDown={tmpHandle}
						value={selectedDate}
						formatDay={(locale, date) => moment(date).format("DD")}
						minDetail="month"
						maxDetail="month"
						showNeighboringMonth={false}
						calendarType="US"
						prev2Label={"1년 전"}
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
	justify-content: space-between;
`;

export default TodayQuestions;
