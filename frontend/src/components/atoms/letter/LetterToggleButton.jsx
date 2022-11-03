import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { media } from "../../../utils/styleUtil";
import { ColorTypes } from "./../../../constants/Colors";

const LetterToggleButton = ({ children, category, act, setAct, ...props }) => {
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    if (act) {
      setShadow(category === "write" ? false : true);
    } else {
      setShadow(category === "write" ? true : false);
    }
  }, [act]);

  return (
    <StyledButton
      shadow={shadow}
      category={category}
      act={act}
      onClick={() => setAct(category === "write" ? true : false)}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  background-color: ${(props) =>
    props.category === "write"
      ? ColorTypes.LETTER_WRITE_COLOR
      : ColorTypes.LETTER_DRAW_COLOR};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  box-shadow: ${(props) =>
    props.shadow ? "inset 0 0 0.5rem #383838" : "none"};
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
  transition: 0.2s ease;

  ${media.phone`
    width: 50vw;
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
