import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { letterState } from "./../../recoil/Atoms";
import { MAX_CHAR_COUNT, MIN_CHAR_COUNT } from "./../../constants/Variables";
import BackgroundVideo from "../../components/atoms/BackgroundVideo";
import { RowCenterWrapper } from "../../styles/Wrapper";
import ContentBlock from "./../../components/atoms/letter/ContentBlock";
import { SizeTypes } from "../../constants/Sizes";
import { LetterOptions } from "./../../constants/Options";
import LetterImg from "./../../components/atoms/letter/LetterImg";
import Input from "./../../components/atoms/Input";
import { LetterTextArea } from "./../../components/atoms/TextArea";
import LetterProgressBar from "./../../components/molecules/letter/LetterProgressBar";
import Button from "./../../components/atoms/Button";
import { saveReplyLetter } from "./../../api/letterWriteAPI";
import { popErrorAlert, popWarningAlert } from "./../../utils/sweetAlert";
import styled from "styled-components";
import ReadLetterPic from "../../components/molecules/ReadLetterPic";
import ReadLetterText from "../../components/molecules/ReadLetterText";

const ReplyPage = () => {
	const [charCount, setCharCount] = useState(0); // 글자 수 카운트
	const [charCountWarning, setCharCountWarning] = useState(true); // 글자수 미만 또는 초과로 인한 경고 표시
	const [flip, setFlip] = useState(false);
	const [isPicture, setIsPicture] = useState(false);
	const originLetter = useRecoilValue(letterState);

	const titleInput = useRef(); // 제목 ref (값 가져오기, focus)
	const contentInput = useRef(); // 내용 ref (값 가져오기, ref)
	const wrapRef = useRef(); // 편지지 영역 ref
	const unshowRef = useRef([]); // 보내기 버튼 누를 시 사라질 영역들 ref

	const navigate = useNavigate();

	useEffect(() => {
		if (originLetter) {
			originLetter.letterInfo.imageLetterUrl ? setIsPicture(true) : setIsPicture(false);
		} else {
			navigate("/");
			popErrorAlert("", "올바른 접근이 아닙니다!");
		}
	}, []);

	useEffect(() => {
		charCount < MIN_CHAR_COUNT || charCount > MAX_CHAR_COUNT ? setCharCountWarning(true) : setCharCountWarning(false);
	}, [charCount]);

	/**
	 * @description 편지지 텍스트 입력 시 이벤트
	 * @param {number} length
	 */
	const handleLetterWrite = (length) => {
		setCharCount(length);
	};

	/**
	 * @description "지우기" 버튼 클릭 시 내용 지우는 이벤트
	 */
	const handleDeleteContent = () => {
		contentInput.current.value = "";
	};

	/**
	 * @description "보내기" 버튼 눌렀을 시 이벤트
	 */
	const handleLetterSend = async () => {
		// 1. 유효성 검사
		const title = titleInput.current.value;
		const content = contentInput.current.value;
		if (title.length < 1) {
			popWarningAlert("제목을 입력해주세요.");
			return;
		} else if (content.length < MIN_CHAR_COUNT) {
			popWarningAlert(`편지 내용을 ${MIN_CHAR_COUNT}자 이상 입력해주세요.`);
			return;
		} else if (content.length > MAX_CHAR_COUNT) {
			popWarningAlert(`편지 내용을 ${MAX_CHAR_COUNT}자 이하 입력해주세요.`);
			return;
		}

		// 2. 답장 요청 전송
		const response = await saveReplyLetter(originLetter.letterInfo.letterId, {
			title: originLetter.letterInfo.title,
			content: originLetter.letterInfo.title === null ? "" : originLetter.letterInfo.title,
			backgroundId: originLetter.letterInfo.backgroundId,
			fontId: originLetter.letterInfo.fontId === null ? 0 : originLetter.letterInfo.fontId,
		});

		if (!response || (response.status != 200 && response.status != 201)) {
			popErrorAlert("편지 전송 오류", "편지 전송 중 오류가 발생했습니다.");
			return;
		}

		// 편지 보내는 애니메이션
		for (let r of unshowRef.current) {
			r.style.opacity = 0;
		}

		setTimeout(() => {
			wrapRef.current.style.margin = "0rem 0 0 0";
		}, 500);
		setTimeout(() => {
			titleInput.current.style.opacity = 0;
			contentInput.current.style.opacity = 0;
			wrapRef.current.style.height = 0;
		}, 1000);
		setTimeout(() => {
			wrapRef.current.style.margin = "1rem 0 0 0";
		}, 1500);

		setTimeout(() => {
			navigate("/writesuccess");
		}, 2500);
	};

	return (
		<>
			<BackgroundVideo isBlur={true} path={`${process.env.PUBLIC_URL}/assets/video/bg2.mp4`} />
			<RowCenterWrapper>
				<ContentBlock
					margin="2rem 0 0 0"
					height={SizeTypes.PC_LETTER_HEIGHT}
					mWidth={SizeTypes.MOBILE_LETTER_WIDTH}
					mHeight={SizeTypes.MOBILE_LETTER_HEIGHT}
					flexDirection="column"
					ref={wrapRef}
				>
					<FlipFrontWrapper actFlip={flip}>
						<LetterImg src={`${process.env.PUBLIC_URL}/assets/images/letter/${LetterOptions.PAPERS[originLetter.letterInfo.backgroundId]}.png`} />
						<Input
							width="96%"
							height={SizeTypes.PC_TITLE_HEIGHT}
							fontSize="1.2rem"
							fontWeight="bold"
							padding="0.5rem 0 0.5rem 0"
							borderShow={false}
							placeholder="제목"
							myRef={titleInput}
						/>
						<LetterTextArea
							fontFamily={LetterOptions.FONTS[originLetter.letterInfo.fontId]}
							onChange={(e) => handleLetterWrite(e.target.value.length)}
							placeholder="내용"
							ref={contentInput}
						/>
						<LetterProgressBar charCount={charCount} charCountWarning={charCountWarning} myRef={(el) => (unshowRef.current[0] = el)} />
					</FlipFrontWrapper>
					<FlipBackWrapper actFlip={flip} ref={(el) => (unshowRef.current[2] = el)}>
						<LetterImg src={`${process.env.PUBLIC_URL}/assets/images/letter/${LetterOptions.PAPERS[originLetter.letterInfo.backgroundId]}.png`} />
						{isPicture ? (
							<>
								<ReadLetterPic info={originLetter.letterInfo}></ReadLetterPic>
							</>
						) : (
							<>
								<ReadLetterText info={originLetter.letterInfo} nickname={originLetter.writerNickname} />
							</>
						)}
					</FlipBackWrapper>
				</ContentBlock>

				<ContentBlock
					height="5rem"
					alignItems="center"
					justifyContent="space-between"
					mWidth={SizeTypes.MOBILE_LETTER_WIDTH}
					ref={(el) => (unshowRef.current[1] = el)}
				>
					<Button
						hoverBgOpacity="0.2"
						fontSize="1.2rem"
						height="3rem"
						width="6.5rem"
						margin="0 0 0 0"
						shadow={true}
						onClick={() => handleDeleteContent()}
					>
						지우기
					</Button>
					<Button hoverBgOpacity="0.2" fontSize="1.2rem" height="3rem" width="6.5rem" margin="0 0 0 1%" shadow={true} onClick={() => setFlip(!flip)}>
						뒤집기
					</Button>
					<Button
						hoverBgOpacity="0.2"
						fontSize="1.2rem"
						height="3rem"
						width="6.5rem"
						margin="0 0 0 0"
						shadow={true}
						onClick={() => handleLetterSend()}
					>
						보내기
					</Button>
				</ContentBlock>
			</RowCenterWrapper>
		</>
	);
};

// 답장 쓰는 란
const FlipFrontWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;

	-webkit-backface-visibility: hidden;
	-webkit-transform: translate3d(0, 0, 0);
	-webkit-perspective: 0;
	-webkit-transition: 1s;
	backface-visibility: hidden; /*뒷면 숨기기*/
	visibility: visible;
	transition: 1s;
	position: absolute;
	transform: rotateY(0deg);

	${(props) => props.actFlip && "transform: rotateY(180deg)"};
`;

// 원본 편지
const FlipBackWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;

	-webkit-backface-visibility: hidden;
	-webkit-transform: translate3d(0, 0, 0);
	-webkit-perspective: 0;
	-webkit-transition: 1s;
	backface-visibility: hidden; /*뒷면 숨기기*/
	visibility: visible;
	transition: 1s;
	transform: rotateY(-180deg);

	${(props) => props.actFlip && "transform: rotateY(0deg)"};
`;

export default ReplyPage;
