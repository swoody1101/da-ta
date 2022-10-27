/**
 * @author mingyu
 */
import React from "react";
import styled from "styled-components";

const Input = ({ ...props }) => {
  return (
    <Container>
      <InputArea {...props} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const InputArea = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 3px solid #383838;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  box-sizing: border-box;
  padding: 0.6rem 0.4rem;
  transition: 0.2s ease;

  &:focus {
    outline: none;
    border-bottom: 3px solid #5778ec;
  }

  :focus::-webkit-input-placeholder {
    color: black;
  }
`;

InputArea.defaultProps = {
  width: "16rem",
  background: "none",
  placeholder: "입력해주세요",
  fontSize: "1rem",
};

export default Input;
