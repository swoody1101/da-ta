import React, { useState } from "react";
import { CenterWrapper, RowCenterWrapper, Wrapper } from "./../../styles/Wrapper";
import LetterToggleButton from "./../../components/atoms/letter_write/LetterToggleButton";
import styled from "styled-components";
import Button from "./../../components/atoms/Button";
import BackgroundVideo from "./../../components/atoms/BackgroundVideo";
import BackgroundGradient from "./../../components/atoms/BackgroundGradient";
import { LetterTextArea } from "../../components/atoms/TextArea";
import { ColorTypes } from "./../../constants/Colors";
import { media } from "../../utils/styleUtil";

const LetterWritePage = () => {
	const MOBILE_WIDTH = "90vw";
	const MOBILE_LETTER_HEIGHT = "126vw";

	const [act, setAct] = useState(true); // [편지지,도화지] 토글
	const [letterDesign, setLetterDesign] = useState("default"); // 편지지 디자인 이름

	return (
		<>
			<BackgroundGradient start={"E2AAFD"} end={"FFDFC2"} />
			<RowCenterWrapper>
				<ContentBlock margin="2rem 0 0 0" mWidth={MOBILE_WIDTH}>
					<LetterToggleButton category="write" act={act} setAct={setAct} width="50%">
						편지지
					</LetterToggleButton>
					<LetterToggleButton category="draw" act={act} setAct={setAct} width="50%">
						도화지
					</LetterToggleButton>
				</ContentBlock>
				<ContentBlock mWidth={MOBILE_WIDTH}>
					<Spacer act={act} />
				</ContentBlock>
				<ContentBlock height="35rem" mWidth={MOBILE_WIDTH} mHeight={MOBILE_LETTER_HEIGHT}>
					<LetterImg src={`${process.env.PUBLIC_URL}/assets/images/letter/${letterDesign}.png`} />
					<LetterTextArea />
				</ContentBlock>
				<ContentBlock height="5rem" alignItems="center" justifyContent="space-between" mWidth={MOBILE_WIDTH}>
					<Button hoverBgOpacity="0.2" fontSize="1.2rem" height="3rem" width="8rem" margin="0 0 0 8%" shadow={true}>
						지우기
					</Button>
					<Button hoverBgOpacity="0.2" fontSize="1.2rem" height="3rem" width="8rem" margin="0 8% 0 0" shadow={true}>
						보내기
					</Button>
				</ContentBlock>
			</RowCenterWrapper>
		</>
	);
};

const ContentBlock = styled.div`
	display: flex;
	position: relative;
	flex-direction: row;
	width: 25rem;
	height: ${(props) => props.height};
	align-items: ${(props) => props.alignItems};
	justify-content: ${(props) => props.justifyContent};
	margin: ${(props) => props.margin};

	${media.phone`
    width: ${(props) => props.mWidth};
    height: calc(${(props) => props.mHeight});
  `}
`;

const LetterImg = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const Spacer = styled.div`
	display: flex;
	width: 100%;
	height: 0.5rem;
	transition: 0.2s ease;
	border-bottom: 1px solid #d9d9d9;
	background-color: ${(props) => (props.act ? ColorTypes.LETTER_WRITE_COLOR : ColorTypes.LETTER_DRAW_COLOR)};
`;

export default LetterWritePage;
