/**
 * @author mingyu
 * @description 도화지 캔버스
 */
import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { firebaseStorage } from "../../../firebase-config";
import { downloadFirebaseStorage, uploadFirebaseStorage } from "../../../utils/firebaseStorage";
import { saveCanvasLetter } from "../../../api/letterWriteAPI";
import { popErrorAlert } from "../../../utils/sweetAlert";
import { popSuccessAlert } from "./../../../utils/sweetAlert";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/Atoms";
import { SIZE_PHONE } from "./../../../constants/Sizes";

/**
 *
 * @param {*} wrap 화면크기
 * @param {object} canvasOptions 캔버스 옵션
 * @param {boolean} canvasSaveTrigger 보내기 버튼 누를 시 트리거
 * @param {*} setCanvasSaveTrigger
 * @param {object} options 편지지 옵션
 * @returns
 */
const LetterCanvasArea = ({ wrap, canvasOptions, canvasSaveTrigger, setCanvasSaveTrigger, options }) => {
	const navigate = useNavigate();
	const canvasRef = useRef(null);
	const contextRef = useRef(null);

	const [ctx, setCtx] = useState();
	const [isDrawing, setIsDrawing] = useState(false);
	const user = useRecoilValue(userState);

	// 캔버스 초기화용 useEffect
	useEffect(() => {
		initCanvas();
	}, [canvasOptions.initTrigger]);

	// 캔버스 옵션 설정용 useEffect
	useEffect(() => {
		handleStroke(canvasOptions.stroke);
		handleColor(canvasOptions.color);
	}, [canvasOptions]);

	// 그림 저장용 useEffect
	useEffect(() => {
		if (!canvasSaveTrigger) return;

		saveCanvas();
		setCanvasSaveTrigger(false);
	}, [canvasSaveTrigger]);

	// 화면 크기 변경 시 캔버스 크기 변경 useEffect
	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = wrap.offsetWidth;
		canvas.height = wrap.offsetHeight;
	}, [wrap.offsetWidth]);

	/** Canvas 초기화 */
	const initCanvas = () => {
		const canvas = canvasRef.current;
		canvas.width = wrap.offsetWidth;
		canvas.height = wrap.offsetHeight;

		const context = canvas.getContext("2d");
		context.strokeStyle = canvasOptions.color;
		context.lineWidth = canvasOptions.stroke;
		contextRef.current = context;

		setCtx(contextRef.current);
	};

	/** 모바일을 위한 터치한 좌표 구하기 */
	const getTouchPos = (e) => {
		let left = 0;
		let top = 0;
		let elem = canvasRef.current;

		// 제일 부모요소까지 반복문으로 접근하여 거리를 구한다.
		while (elem) {
			left = left + parseInt(elem.offsetLeft);
			top = top + parseInt(elem.offsetTop);
			elem = elem.offsetParent;
		}

		// 계산한 범위 리턴
		return {
			offsetX: e.touches[0].clientX - left,
			offsetY: window.innerWidth < SIZE_PHONE ? e.touches[0].clientY - top + 25 : e.touches[0].clientY - top + 25,
		};
	};

	/** 펜 두께 변경 */
	const handleStroke = (stroke) => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		context.lineWidth = stroke;
		setCtx(contextRef.current);
	};

	/** 펜 색깔 변경 */
	const handleColor = (color) => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		context.strokeStyle = color;
		setCtx(contextRef.current);
	};

	/** 드로잉을 시작할 때 이벤트 */
	const startDrawing = () => {
		setIsDrawing(true);
	};

	/** 드로잉을 끝낼 때 이벤트 */
	const finishDrawing = () => {
		setIsDrawing(false);
	};

	/** 캔버스로 그린 그림 저장 */
	const saveCanvas = async () => {
		const image = canvasRef.current.toDataURL("image/png"); // 그린 그림 png로 추출
		const imagePath = uploadFirebaseStorage(image, "drawings/");

		// api 요청 보내자...
		const response = await saveCanvasLetter(options, imagePath);

		if (!response || response.status < 200 || response.status >= 300) {
			popErrorAlert("편지 보내기 실패", "편지 전송 중 문제가 발생했어요");
			return;
		}

		navigate("/writesuccess");
	};

	/** 드로잉 중 이벤트 */
	const drawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;

		// 지우개 모드
		if (ctx && !canvasOptions.drawMode) {
			if (isDrawing) {
				ctx.clearRect(offsetX - canvasOptions.stroke / 2, offsetY - canvasOptions.stroke / 2, canvasOptions.stroke, canvasOptions.stroke);
			}
			return;
		}

		// 그리기 모드
		if (ctx) {
			if (!isDrawing) {
				ctx.beginPath();
				ctx.moveTo(offsetX, offsetY);
			} else {
				ctx.lineTo(offsetX, offsetY);
				ctx.stroke();
			}
		}
	};

	/** 터치 시 그리기 시작 */
	const touchStart = (e) => {
		document.body.style.overflow = "hidden";
		const { offsetX, offsetY } = getTouchPos(e);
		if (ctx) {
			ctx.beginPath();
			ctx.moveTo(offsetX, offsetY);
		}
		setIsDrawing(true);
	};

	/** 터치 시 그리기 */
	const touchDrawing = (e) => {
		const { offsetX, offsetY } = getTouchPos(e);

		// 지우개 모드
		if (ctx && !canvasOptions.drawMode) {
			ctx.clearRect(offsetX - canvasOptions.stroke, offsetY - canvasOptions.stroke, canvasOptions.stroke * 2, canvasOptions.stroke * 2);
			return;
		}

		// 그리기 모드
		if (ctx && isDrawing) {
			ctx.lineTo(offsetX, offsetY);
			ctx.stroke();
		}
	};

	/** 터치 시 그리기 끝 */
	const touchEnd = () => {
		console.log("good");
		document.body.style.overflow = "overlay";
		setIsDrawing(false);
	};

	return (
		<>
			<Container
				ref={canvasRef}
				onMouseDown={startDrawing}
				onMouseUp={finishDrawing}
				onMouseMove={drawing}
				onMouseLeave={finishDrawing}
				onTouchStart={touchStart}
				onTouchMove={touchDrawing}
				onTouchEnd={touchEnd}
			></Container>
		</>
	);
};

const Container = styled.canvas`
	display: flex;
	resize: none;
	border: none;
	z-index: 10;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	background: transparent;
	cursor: inherit;
`;

export default LetterCanvasArea;
