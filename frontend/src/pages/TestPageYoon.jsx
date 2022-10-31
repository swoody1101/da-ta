import React, { useState } from "react";
import styled from "styled-components";
import Title from "../components/atoms/Title";
import { FooterText } from "../components/atoms/Text";
import MainBackgroundSky from "../components/atoms/MainBackgroundSky";
import MainNav from "./../components/templates/MainNav";
import Footer from "../components/molecules/Footer";



const TestPageYoon = () => (
    <>
    <MainNav />
    <div>
    <Title>yoon's test page</Title>
    </div>
    <MainBackgroundSky></MainBackgroundSky>
    <Footer>
    </Footer>
    </>
);



export default TestPageYoon;
