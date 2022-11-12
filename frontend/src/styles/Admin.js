/**
 * @author mingyu
 * @description Admin 페이지에서 사용되는 스타일 컴포넌트 모음
 */
import styled from "styled-components";

export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	height: calc(100% - 1rem);
	width: 100%;
	overflow: scroll;
	overflow-x: hidden;
`;

export const ContentLine = styled.div`
	display: flex;
	width: 100%;
	border-bottom: ${(props) => props.borderBottom};
	font-size: 1rem;
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	background-color: ${(props) => props.backgroundColor};
`;

export const ContentElement = styled.div`
	display: flex;
	flex: ${(props) => props.flex};
	height: 4rem;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-weight: ${(props) => props.fontWeight};
`;

export const ModalContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;

export const ModalContentBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${(props) => props.width || "50%"};
	height: ${(props) => props.height || "4rem"};
	margin: ${(props) => props.margin};
	background-color: #ffffff;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	overflow: scroll;
`;
