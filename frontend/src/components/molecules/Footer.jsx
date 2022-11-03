/**
 * @author chaeyoon
 */
import React from "react";
import styled from "styled-components";
import { FooterText } from "../atoms/Text";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        [SSAFY] 7기 대전 1반 자율프로젝트 - 닿다
        <br />
        <br />
        [Backend | 김강호 박기윤 이상우] <br />
        [Frontend | 김보연 김채윤 조민규] <br />
        <br />
        &copy; {currYear} DA-TA. All rights reserved.
      </FooterText>
    </FooterContainer>
  );
};

const currYear = new Date().getFullYear();

const FooterContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  height: 15vh;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #001f29;
  color: white;
  text-align: center;
  margin-top: 400vh;
`;

export default Footer;
