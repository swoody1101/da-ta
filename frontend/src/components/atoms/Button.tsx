import React from "react";
import styled from "styled-components";

interface ButtonStyleProps {
  margin: string;
  padding: string;
  width: string;
  mWidth?: string;
  height: string;
  bgOpacity: string;
  hoverBgOpacity: string;
  fontSize: string;
  shadow: boolean;
}

interface ButtonProps extends ButtonStyleProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  margin,
  padding,
  width,
  height,
  mWidth,
  bgOpacity,
  hoverBgOpacity,
  fontSize,
  shadow,
  onClick,
  text,
}: ButtonProps) => {
  return (
    <StyledButton
      bgOpacity={bgOpacity}
      hoverBgOpacity={hoverBgOpacity}
      fontSize={fontSize}
      height={height}
      margin={margin}
      mWidth={mWidth}
      padding={padding}
      shadow={shadow}
      onClick={onClick}
      width={width}
    >
      {text}
    </StyledButton>
  );
};

Button.defaultProps = {
  bgOpacity: "0",
  hoverBgOpacity: "0",
  fontSize: "16px",
  height: "32px",
  margin: "0px",
  padding: "0px",
  shadow: false,
  width: "64px",
};

const StyledButton = styled.button<ButtonStyleProps>`
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
  border: 2px solid white;
  border-radius: 8px;
  color: white;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;

  transition: all 0.25s ease-in;
  &:hover {
    background-color: rgba(217, 217, 217, ${(props) => props.hoverBgOpacity});
  }

  @media screen and (max-width: 480px) {
    width: ${(props) => (props.mWidth ? props.mWidth : props.width)};
  }
`;

export default Button;
