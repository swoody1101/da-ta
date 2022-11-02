import React from "react";
import styled from "styled-components";
import MainBackgroundSky from "../../components/atoms/MainBackgroundSky";
import Footer from "../../components/molecules/Footer";
import Chatbox from "../../components/atoms/Chatbox";
import MainSeaGradient from "../../components/atoms/MainSeaGradient";
import Title from "../../components/atoms/Title";
import { MainWave } from "../../components/atoms/MainWave";
import { MainWave2 } from "../../components/atoms/MainWave2";
import { MainText } from "../../components/atoms/Text";
import BottleOfLetter from "../../components/atoms/BottleOfLetter";
import ScrollToTop from "react-scroll-to-top";

import BackgroundGradient from "../../components/atoms/BackgroundGradient";







const LandingPage = () => {
  return(
    <>
        <BackgroundGradient start={"E2AAFD"} end={"FFDFC2"} />
    {/* <BackgroundSky /> */}
    
    <MainText margin="5rem 0 0 0">
          안녕하세요!
          <br />
          여기는 '닿다'에요
        </MainText>
        <MainText margin="5rem 0 0 0">
          누군가에게 편지를 보낼 수 있어요
        </MainText>
        <MainText margin="20rem 0 0 0">
          당신에게도 소중한 편지 한 통이 도착할 수 있답니다
        </MainText>
        <MainText margin="20rem 0 0 0">지금 편지를 쓰러 가 볼까요?</MainText>
      
      
      <BottleWrapper>
        <BottleOfLetter />
      </BottleWrapper>
      

    

    <MainWave opacity={0.5} frequency={16} isRight={true}></MainWave>
    <MainWave opacity={0.6} frequency={8} isRight={true}></MainWave>
    <MainWave opacity={0.4} frequency={13} isRight={false}></MainWave>
    <MainWave opacity={0.5} frequency={20} isRight={false}></MainWave>
    <MainWave opacity={0.3} frequency={20} isRight={false}></MainWave>
    <MainWave2 opacity={0.8} frequency={20} isRight={false}></MainWave2>
    <MainWave2 opacity={1} frequency={20} isRight={true}></MainWave2>

    <MainSeaGradient />

    <Footer />
    <ScrollToTop smooth color="#6f00ff" border="20"/>
    
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  flex-direction : column;
  justify-content: center;
  align-items: center;
`;

const BottleWrapper = styled.div`
  display: flex;
  position: absolute;
  margin-top : 40vh;
  margin-left : 50vw;
  flex-direction : row;
  justify-content: center;


`;


export default LandingPage;
