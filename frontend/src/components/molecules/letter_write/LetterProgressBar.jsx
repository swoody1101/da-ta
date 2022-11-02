import React from "react";
import styled from "styled-components";
import { ColorTypes } from "./../../../constants/Colors";

const LetterProgressBar = ({ charCount, charCountWarning }) => {
  return (
    <Container charCountWarning={charCountWarning}>
      {charCount}자 / 1000자
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: absolute;
  bottom: 2.5rem;
  right: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.6rem 0.2rem 0.6rem;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.charCountWarning ? ColorTypes.WARNING : "#000000"};
  opacity: 0.5;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  z-index: 10;
`;

export default LetterProgressBar;
