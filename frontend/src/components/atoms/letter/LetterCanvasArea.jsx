import styled from "styled-components";

import React, { useEffect, useRef, useState } from "react";

const LetterCanvasArea = ({ color, stroke }) => {
	const canvasRef = useRef(null);
	const contextRef = useRef(null);

	const [ctx, setCtx] = useState();
	const [isDrawing, setIsDrawing] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = 400; // ## 캔버스 크기 props로 받아 설정해야 함!
		canvas.height = 600; // ## 캔버스 크기 props로 받아 설정해야 함!

		const context = canvas.getContext("2d");
		context.strokeStyle = "black";
		context.lineWidth = 2.5;
		contextRef.current = context;

		setCtx(contextRef.current);
	}, []);

	/** 드로잉을 시작할 때 이벤트 */
	const startDrawing = () => {
		setIsDrawing(true);
	};

	/** 드로잉을 끝낼 때 이벤트 */
	const finishDrawing = () => {
		setIsDrawing(false);
	};

	/** 캔버스로 그린 그림 저장 */
	const saveCanvas = () => {
		const image = canvasRef.current.toDataURL("image/png");
		const link = document.createElement("a");
		link.href = image;
		link.download = "draw_image.png";
		link.click();
	};

	/** 드로잉 중 이벤트 */
	const drawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;

		// canvas.getContext('2d')의 값이 있을 때
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

	return (
		<Container
			ref={canvasRef}
			onMouseDown={startDrawing}
			onMouseUp={finishDrawing}
			onMouseMove={drawing}
			onMouseLeave={finishDrawing}
			onTouchStart={startDrawing}
			onTouchEnd={finishDrawing}
			onTouchMove={drawing}
		></Container>
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
	color: black;
	// background-color: skyblue;
`;

export default LetterCanvasArea;
