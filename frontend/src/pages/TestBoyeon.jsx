import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BackgroundVideo from "../components/atoms/BackgroundVideo";
import { Wrapper } from "../styles/Wrapper";
import { media } from "../utils/styleUtil";
import styled from "styled-components";

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
      <Wrapper style={{ alignItems: "center" }}>
        <BlurBlur>
          <p>편지왔다</p>
          <p>읽어라</p>
          <div
            style={{ width: "100px", height: "100px", backgroundColor: "red" }}
          >
            병 그림 들어갈 자리
          </div>
        </BlurBlur>
        <Template>
          <Paper></Paper>
          <Buttons>
            <BubbleBtn />
            <BubbleBtn />
            <BubbleBtn2 />
          </Buttons>
        </Template>
      </Wrapper>
    </>
  );
};

const BlurBlur = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 250px;
  background-color: black;
  opacity: 0.6;
  color: white;
  font-size: 24px;
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

const Paper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 66vh;
  width: 44vh;
  background-color: red;
  opacity: 0.6;

  ${media.tablet2`
    width: 90%;
    height: 70%;
  `}
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: space-between;
  height: 14vh;
  width: 60vh;
  background-color: blue;
  opacity: 0.6;
  ${media.tablet2`
    width: 90%;
    height: 15%;
  `}
`;

const BubbleBtn = styled.div`
  height: 12.5vh;
  width: 12.5vh;
  background-color: yellow;
  opacity: 0.6;
  border-radius: 50%;
  ${media.phone`
    width: 40%;
    height: 40px;
    border-radius: 8px;
  `}
`;

const BubbleBtn2 = styled.div`
  height: 12.5vh;
  width: 12.5vh;
  background-color: yellow;
  opacity: 0.6;
  border-radius: 50%;
  ${media.phone`
    display: none;
  `}
`;
export default TestBoyeon;
