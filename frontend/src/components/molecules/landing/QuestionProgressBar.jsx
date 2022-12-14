/**
 * @author chaeyoon
 */
import React from "react";
import styled from "styled-components";
import { MAX_CHAR_COUNT_Q } from "../../../constants/Variables";
import { ColorTypes } from "./../../../constants/Colors";

const QuestionProgressBar = ({ charCount, charCountWarning, myRef }) => {
  return (
    <Container charCountWarning={charCountWarning} ref={myRef}>
      {charCount}자 / {MAX_CHAR_COUNT_Q}자
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.6rem 0.2rem 0.6rem;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.charCountWarning ? ColorTypes.WARNING : "#000000"};
  opacity: 0.8;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  z-index: 10;
`;

export default QuestionProgressBar;
