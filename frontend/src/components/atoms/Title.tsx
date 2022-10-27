import React from "react";
import styled from "styled-components";

interface TitleStyleProps {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
}

interface TitleProps extends TitleStyleProps {
  text: string;
}

const Title = ({ text }: TitleProps) => {
  return <TitleText>{text}</TitleText>;
};

Title.defaultProps = {
  fontSize: "4rem",
  fontWeight: "bold",
  color: "white",
};

const TitleText = styled.h1<TitleStyleProps>`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;

export default Title;
