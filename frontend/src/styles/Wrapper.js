import styled from "styled-components";
import { SizeTypes, SIZE_PHONE } from "../constants/Sizes";

let MARGIN_FROM_HEADER = window.innerWidth > SIZE_PHONE ? SizeTypes.PC_HEADER_HEIGHT : SizeTypes.MOBILE_HEADER_HEIGHT;

export const Wrapper = styled.div`
	display: flex;
	position: absolute;
	width: 100%;
	min-height: calc(100vh - ${MARGIN_FROM_HEADER});
	margin-top: ${MARGIN_FROM_HEADER};
`;

export const CenterWrapper = styled(Wrapper)`
	position: relative;
	justify-content: center;
	align-items: center;
`;

export const RowCenterWrapper = styled(Wrapper)`
	position: relative;
	align-items: center;
	flex-direction: column;
`;

export const AdminWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	min-height: calc(100vh - ${MARGIN_FROM_HEADER});
	box-sizing: border-box;
	padding: 2rem;
`;
