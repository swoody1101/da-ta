import React, { useState } from "react";
import styled from "styled-components";
import Title from "../components/atoms/Title";
import { FooterText } from "../components/atoms/Text";
import MainBackgroundSky from "../components/atoms/MainBackgroundSky";
import MainNav from "./../components/templates/MainNav";
import Footer from "../components/molecules/Footer";
import BackgroundGradient from "../components/atoms/BackgroundGradient";
import MainSeaGradient from "../components/atoms/MainSeaGradient";
import Bubble from "../components/atoms/Bubble";
import ScrollToTop from "react-scroll-to-top";


const TestPageYoon = () => (
    <>
    {/* <MainBackgroundGradient start={'ff2f00'} middle={'001aff'} end={'fffb00'}/> */}
    <BackgroundGradient start={'E2AAFD'} end={'FFDFC2'}></BackgroundGradient>
    {/* <Title>닿다</Title> */}

    <BubbleContainer>
        <Bubble margin_top="3vh" left="100%" width="8vh" height="8vh" frequency={1.5} borderSize="2px" isRight={false}></Bubble>
        <Bubble margin_top="2vh" left="3%" width="5vh" height="5vh" frequency={2.5} borderSize="3px" isRight={true}></Bubble>
        <Bubble margin_top="4vh" left="50%" width="10vh" height="10vh" frequency={3.2} borderSize="3.5px" isRight={false}></Bubble>
        <Bubble margin_top="1.5vh" left="70%" width="5vh" height="5vh" frequency={2.3} borderSize="1.2px" isRight={false}></Bubble>
        <Bubble margin_top="2vh" left="90%" width="5vh" height="5vh" frequency={1.7} borderSize="2px" isRight={true}></Bubble>
        <Bubble margin_top="3vh" left="80%" width="5vh" height="5vh" frequency={1.9} borderSize="2.5px" isRight={true}></Bubble>
        
    </BubbleContainer>
    
    <ScrollToTop smooth color="#6f00ff" border="20"/>



    {/* <Wave opacity={.4} frequency={13} isRight={false}></Wave> */}
    </>
);

const BubbleContainer = styled.div`
    position: relative;    
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    margin-top: 6rem;
`;


// display: flex;
// flex-direction: column;
// width: 100vw;
// margin-top: 6rem;
// align-items: center;
// justify-content: flex-end;
// // background-color: #d1c4e9;


export default TestPageYoon;
