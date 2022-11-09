import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Modal from "./../../components/organisms/Modal";
import { MainSmallText } from "./../../components/atoms/Text";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../recoil/Atoms";
import { accuseUser, getReportList } from "./../../api/adminAPI";
import { popWarningAlert, popSuccessAlert, popErrorAlert } from "./../../utils/sweetAlert";
import ReportsTemplate from "../../components/templates/admin/ReportsTemplate";
import { ModalContentBox, ModalContentWrapper } from "../../styles/Admin";

const Reports = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const listType = searchParams.get("listType");

	const flexRate = [2, 4, 5, 5, 4, 2, 2];
	const categoryList = ["번호", "신고 날짜", "신고자", "신고 대상", "신고 사유", "내용", "신고 처리"];

	const [modalToggle, setModalToggle] = useState(false);
	const [modalContent, setModalContent] = useState({
		reportedNickname: null,
		content: null, // 편지텍스트 또는 이미지url
	});
	const setLoading = useSetRecoilState(loadingState);
	const [itemList, setItemList] = useState([]);

	useEffect(async () => {
		setLoading(true);
		setItemList([]);
		const response = await getReportList(listType);
		setLoading(false);
		if (response.status !== 200) {
			popErrorAlert("목록 불러올 수 없음", "신고 목록을 불러오던 중 문제가 발생했습니다.");
			return;
		}

		console.log(response);

		setItemList([...(listType === "letter" ? response.data.accusedLetters : response.data.accusedAnswers)]);
	}, [listType]);

	/** [편지, 오늘의질문 답변] 내용 보기 */
	const handleModal = (item) => {
		setModalContent({
			reportedNickname: item.reportedNickname,
			content: item.content,
		});
		setModalToggle(true);
	};

	/** [편지, 오늘의질문 답변]신고 처리 */
	const handleAccuse = async (item, userId, e) => {
		if (item.isAccused) {
			popWarningAlert("신고 처리 실패", "이미 경고처리된 신고입니다.");
			return;
		}

		setLoading(true);
		const response = await accuseUser(userId, listType);
		setLoading(false);

		if (response.status !== 200 && response.status !== 201) {
			popWarningAlert("신고 처리 실패", "신고 처리 중 문제가 발생했습니다.");
			return;
		}

		popSuccessAlert("신고 처리 성공", "신고에 대한 경고 처리가 완료되었습니다.");
		// # setstate를 통해 리스트[idx].isAccused = true 처리
		e.target.style.backgroundColor = "#d9d9d9";
	};

	return (
		<>
			{modalToggle && (
				<Modal titleText={"내용"} modalToggle={modalToggle} setModalToggle={setModalToggle}>
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
				title={listType === "letter" ? "신고 관리 - 편지" : "신고 관리 - 오늘의 답변"}
				categoryList={categoryList}
				// itemList={letterList}
				itemList={itemList}
				handleModal={handleModal}
				handleAccuse={handleAccuse}
				flexRate={flexRate}
			/>
		</>
	);
};

export default Reports;
