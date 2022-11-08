/**
 * @author mingyu
 */
import React from "react";
import styled from "styled-components";
import { media } from "../../utils/styleUtil";

const Button = ({ children, onClick, ...props }) => {
  return (
    <StyledButton {...props} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

Button.defaultProps = {
  bgOpacity: "0",
  hoverBgOpacity: "0",
  fontSize: "1rem",
  height: "2rem",
  margin: "0rem",
  padding: "0rem",
  shadow: false,
  width: "4rem",
  borderRadius: "0.5rem",
  hasBorder: true,
};

const StyledButton = styled.button`
  display: flex;
  background-color: rgba(217, 217, 217, ${(props) => props.bgOpacity});
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  filter: ${(props) =>
    props.shadow ? "drop-shadow(4px 8px 12px rgba(38,38,38,0.5))" : ""};
  cursor: pointer;
  border: ${(props) =>
    props.hasBorder ? "2px solid white" : props.borderStyle};
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.color || "white"};
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;

  transition: all 0.2s ease-in;
  &:hover {
    background-color: rgba(217, 217, 217, ${(props) => props.hoverBgOpacity});
  }

  ${media.phone`
		width: ${(props) => (props.mWidth ? props.mWidth : props.width)};
    height: ${(props) => (props.mHeight ? props.mHeight : props.height)};
    border-radius: ${(props) =>
      props.mBorderRadius ? props.mBorderRadius : props.borderRadius};
	`}
`;

export default Button;
