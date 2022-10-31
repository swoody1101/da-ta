import React from "react";
import styled from "styled-components";
import { media } from "../../../utils/styleUtil";

const LetterToggleButton = ({ children, isActive, setAct, ...props }) => {
  return (
    <StyledButton isActive={isActive} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  background-color: ${(props) => (props.isActive ? "#D7EEC9" : "#d9d9d9")};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  box-shadow: ${(props) =>
    props.isActive ? "none" : "inset 0 0 0.75rem #383838"};
  cursor: pointer;
  border: none;
  border-radius: 1rem 1rem 0 0;
  color: black;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  transition: all 0.25s ease-in;
  letter-spacing: 0.25rem;

  ${media.phone`
    width: ${(props) => (props.mWidth ? props.mWidth : props.width)};
  `}
`;

LetterToggleButton.defaultProps = {
  margin: "0rem",
  padding: "0rem",
  width: "18.75rem",
  height: "4rem",
  fontSize: "1.5rem",
};

export default LetterToggleButton;
