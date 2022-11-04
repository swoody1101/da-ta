import React from "react";
import { useEffect, useState } from "react";
import BackgroundVideo from "../components/atoms/BackgroundVideo";
import { Wrapper } from "../styles/Wrapper";
import { media } from "../utils/styleUtil";
import styled from "styled-components";
import ContentBlock from "../components/atoms/letter/ContentBlock";
import { SizeTypes, SIZE_WIDE } from "../constants/Sizes";
import LetterImg from "../components/atoms/letter/LetterImg";

const TestBoyeon = () => {
  const [blur, setBlur] = useState(false);
  useEffect(async () => {
    setTimeout(() => {
      setBlur(true);
    }, 5000);
  }, []);
  return (
    <>
      <BackgroundVideo
        isBlur={blur}
        path={`${process.env.PUBLIC_URL}/assets/video/bg2.mp4`}
      />
      <ReadWrapper style={{}}>
        {/* <BlurBlur>
          <p>편지왔다</p>
          <p>읽어라</p>
          <div
            style={{ width: "100px", height: "100px", backgroundColor: "red" }}
          >
            병 그림 들어갈 자리
          </div>
        </BlurBlur> */}
        <ContentBlock
          height={SizeTypes.PC_LETTER_HEIGHT}
          mWidth={SizeTypes.MOBILE_LETTER_WIDTH}
          mHeight={SizeTypes.MOBILE_LETTER_HEIGHT}
          flexDirection="column"
          optionToggle={false}
          style={{ opacity: 0.6 }}
        >
          <LetterImg
            src={`${process.env.PUBLIC_URL}/assets/images/letter/${"핑크"}.png`}
          />
          <Container
            width="96%"
            height={SizeTypes.PC_TITLE_HEIGHT}
            padding="0.5rem 0 0.5rem 0"
          >
            <LetterTitle width="96%" fontSize="1.2rem" fontWeight="bold">
              타이틀
            </LetterTitle>
          </Container>
          <LetterContent>
            You can now view frontend in the browser. Local:
            http://localhost:3000 On Your Network: http://192.168.31.78:3000
            Note that the development build is not optimized. To create a
            production build, use npm run build. You can now view frontend in
            the browser. Local: http://localhost:3000 On Your Network:
            http://192.168.31.78:3000 Note that the development build is not
            optimized. To create a production build, use npm run build. You can
            now view frontend in the browser. Local: http://localhost:3000 On
            Your Network: http://192.168.31.78:3000 Note that the development
            build is not optimized. To create a production build, use npm run
            build. You can now view frontend in the browser. Local:
            http://localhost:3000 On Your Network: http://192.168.31.78:3000
            Note that the development build is not optimized. To create a
            production build, use npm run build. You can now view frontend in
            the browser. Local: http://localhost:3000 On Your Network:
            http://192.168.31.78:3000 Note that the development build is not
            optimized. To create a production build, use npm run build.
          </LetterContent>
        </ContentBlock>
        <Buttons>
          <BubbleBtn1 width={"12.5vh"} height={"12.5vh"} />
          <BubbleBtn1 width={"12.5vh"} height={"12.5vh"} />
          <BubbleBtn2 width={"12.5vh"} height={"12.5vh"} />
        </Buttons>
      </ReadWrapper>
    </>
  );
};

// const BlurBlur = styled.div`
//   display: flex;
//   position: absolute;
//   flex-direction: column;
//   justify-content: space-evenly;
//   align-items: center;
//   width: 100%;
//   height: 250px;
//   background-color: black;
//   opacity: 0.6;
//   color: white;
//   font-size: 24px;
// `;
const ReadWrapper = styled(Wrapper)`
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LetterTitle = styled.p`
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  padding: 0.6rem 0.4rem;
  transition: 0.2s ease;
  ${media.phone`
    width: ${(props) => (props.mWidth ? props.mWidth : props.width)};
  `}
`;

LetterTitle.defaultProps = {
  width: "16rem",
  background: "none",
  fontSize: "1rem",
};

const LetterContent = styled.div`
  display: flex;
  resize: none;
  border: none;
  z-index: 10;
  width: 100%;
  height: ${SizeTypes.PC_CONTENT_HEIGHT};
  padding: 1rem;
  box-sizing: border-box;
  background: transparent;
  font-family: ${(props) => props.fontFamily || ""};
  font-size: 1rem;
  line-height: 1.5rem;
  color: black;
  overflow-y: auto;

  ${media.phone`
    height: ${SizeTypes.MOBILE_CONTENT_HEIGHT};
  `}
`;

const Template = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 80vh;
  background-color: black;
  opacity: 0.6;

  ${media.tablet2`
    width: 100%;
    height: 100%;
    justify-content: center;
  `}
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: space-between;
  height: 14vh;
  width: 600px;
  background-color: blue;
  opacity: 0.6;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
  ${media.phone`
    height: 9vh;
  `}
`;

const BubbleBtn = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background-color: yellow;
  opacity: 0.6;
  border-radius: 50%;
`;

const BubbleBtn1 = styled(BubbleBtn)`
  ${media.phone`
  width: 40%;
  height: 40px;
  border-radius: 8px;
`}
`;

const BubbleBtn2 = styled(BubbleBtn)`
  ${media.phone`
    display: none;
  `}
`;
export default TestBoyeon;
