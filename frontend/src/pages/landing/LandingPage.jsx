import React from "react";
import styled from "styled-components";
import MainBackgroundSky from "../../components/atoms/MainBackgroundSky";
import Footer from "../../components/molecules/Footer";
import Chatbox from "../../components/atoms/Chatbox";
import MainSeaGradient from "../../components/atoms/MainSeaGradient";
import Title from "../../components/atoms/Title";
import { Wave } from "../../components/atoms/Wave";
import BottleOfLetter from "../../components/atoms/BottleOfLetter";
import ScrollToTop from "react-scroll-to-top";






const LandingPage = () => {
  return(
    <>
    <MainBackgroundSky />
    
      <Title>메인
      </Title>
    {/* <BottleOfLetter width="10vw" height="10vh"/> */}

    <Wave opacity={0.5} frequency={16} isRight={true}></Wave>
    <Wave opacity={0.3} frequency={8} isRight={true}></Wave>
    <Wave opacity={0.4} frequency={13} isRight={false}></Wave>
    <Wave opacity={0.2} frequency={20} isRight={false}></Wave>

    <MainSeaGradient />

    <Footer />
    <ScrollToTop smooth color="#6f00ff" border="20"/>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  min-height: 100vh;
  flex-direction : column;
  justify-content: center;
  align-items: center;
`;


export default LandingPage;
