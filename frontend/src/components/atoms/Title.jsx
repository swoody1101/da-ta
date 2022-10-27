import React from "react";
import styled from "styled-components";

const Title = ({ text }) => {
  return <TitleText>{text}</TitleText>;
};

Title.defaultProps = {
  fontSize: "4rem",
  fontWeight: "bold",
  color: "white",
};

const TitleText = styled.h1`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;

export default Title;
