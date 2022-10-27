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
  borderRadius: string;
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
  borderRadius,
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
      borderRadius={borderRadius}
    >
      {text}
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
  border-radius: ${(props) => props.borderRadius};
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
