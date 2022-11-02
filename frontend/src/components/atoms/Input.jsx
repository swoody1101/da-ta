/**
 * @author mingyu
 */
import React from "react";
import styled from "styled-components";
import App from "./../../App";

const Input = ({ ...props }) => {
  return (
    <Container {...props}>
      <InputArea {...props} placeholder={props.placeholder} ref={props.myRef} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  align-items: center;
  justify-content: center;
  position: relative;
`;

const InputArea = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: ${(props) => (props.borderShow ? "3px solid #383838" : "")};
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
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

  @media screen and (max-width: 480px) {
    width: ${(props) => (props.mWidth ? props.mWidth : props.width)};
  }
`;

InputArea.defaultProps = {
  width: "16rem",
  background: "none",
  placeholder: "입력해주세요",
  fontSize: "1rem",
};

export default Input;
