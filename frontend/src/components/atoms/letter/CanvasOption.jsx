/**
 * @author mingyu
 */
import React from "react";
import styled from "styled-components";

const CanvasOption = ({
  isButton, // 버튼 or input (true or false)
  defaultValue, // 기본값
  onClick, // 클릭 시 이벤트
  onChange, // 변화 시 이벤트
  width,
  height,
  borderRadius,
  bgColor,
  boxShadow,
  children,
}) => {
  return (
    <>
      {isButton ? (
        <ButtonContainer
          onClick={onClick}
          width={width}
          height={height}
          borderRadius={borderRadius}
          bgColor={bgColor}
          boxShadow={boxShadow}
        >
          {children}
        </ButtonContainer>
      ) : (
        <InputContainer
          type="number"
          value={defaultValue}
          onClick={onClick}
          onChange={onChange}
          width={width}
          height={height}
          borderRadius={borderRadius}
          bgColor={bgColor}
        >
          {children}
        </InputContainer>
      )}
    </>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.bgColor};
  box-shadow: ${(props) => props.boxShadow};
  transition: all 0.15s ease-in;

  &:hover {
    width: ${(props) => `calc(${props.width} * 1.1)`};
    height: ${(props) => `calc(${props.height} * 1.1)`};
  }
  &:not(:hover) {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
  }
`;

const InputContainer = styled.input`
  display: flex;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.bgColor};
  justify-content: center;
  align-items: center;
  text-align: center;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  [type="number"] {
    -moz-appearance: textfield;
  }
`;

export default CanvasOption;
