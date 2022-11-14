import React from "react";
import styled from "styled-components";
import { media } from "../../utils/styleUtil";

const LogoImage = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      {/* <img
        src={`${process.env.PUBLIC_URL}/assets/logo/data_logo.png`}
        height="100%"
      /> */}
      <LogoText>DA-TA</LogoText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 3rem;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ${media.phone`
    left: 1rem;
	`}
`;

export const LogoText = styled.p`
  display: flex;
  font-size: 2rem;
  font-family: "다래손글씨";
  line-height: 64px;
  font-weight: bold;
  background: linear-gradient(
    90deg,
    rgba(37, 120, 236, 1) 0%,
    rgba(87, 120, 236, 1) 35%,
    rgba(50, 56, 53, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 8px;
`;

export default LogoImage;
