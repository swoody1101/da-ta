import React from "react";
import styled from "styled-components";
import { MainText } from "./../../atoms/Text";
import CanvasOption from "./../../atoms/letter/CanvasOption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPencil } from "@fortawesome/free-solid-svg-icons";
import { ChromePicker } from "react-color";
import { useState } from "react";

const CanvasOptionBar = ({ canvasOptions, setCanvasOptions, myRef }) => {
  const [colorPickerShow, setColorPickerShow] = useState(false);

  const handleColorChange = (picked) => {
    setCanvasOptions({ ...canvasOptions, color: picked.hex });
  };

  return (
    <OptionBarContainer ref={myRef}>
      <OptionWrapper>
        <OptionText>색상</OptionText>
        <CanvasOption
          isButton={true}
          onClick={() => setColorPickerShow(!colorPickerShow)}
          bgColor={canvasOptions.color}
          width={"1.75rem"}
          height={"1.75rem"}
          borderRadius={"100%"}
          boxShadow={"2px 2px 1px 1px rgba(0, 0, 0, 0.5)"}
        ></CanvasOption>
        {colorPickerShow && (
          <ColorPickerWrapper>
            <ChromePicker
              color={canvasOptions.color}
              onChange={(e) => handleColorChange(e)}
            />
          </ColorPickerWrapper>
        )}
      </OptionWrapper>
      <OptionWrapper>
        <OptionText>굵기</OptionText>
        <CanvasOption
          isButton={false}
          bgColor={"white"}
          width={"2.25rem"}
          height={"1.2rem"}
          borderRadius={"32px"}
          defaultValue={canvasOptions.stroke}
          onChange={(e) => {
            setCanvasOptions({ ...canvasOptions, stroke: e.target.value });
          }}
        ></CanvasOption>
      </OptionWrapper>
      <OptionWrapper>
        <OptionText>도구</OptionText>
        <CanvasOption
          isButton={true}
          onClick={() =>
            setCanvasOptions({
              ...canvasOptions,
              drawMode: !canvasOptions.drawMode,
            })
          }
          bgColor={"transparent"}
          width={"1.75rem"}
          height={"1.75rem"}
          borderRadius={"100%"}
          boxShadow={"2px 2px 1px 1px rgba(0, 0, 0, 0.5)"}
        >
          {canvasOptions.drawMode ? (
            <FaWrapper>
              <FontAwesomeIcon icon={faPencil} size="1x" />
            </FaWrapper>
          ) : (
            <FaWrapper>
              <FontAwesomeIcon icon={faEraser} size="1x" />
            </FaWrapper>
          )}
        </CanvasOption>
      </OptionWrapper>
    </OptionBarContainer>
  );
};

const OptionBarContainer = styled.div`
  display: flex;
  position: absolute;
  top: 2%;
  left: 50%; // absolute 가운데 정렬시키기 1
  transform: translate(-50%); // absolute 가운데 정렬시키기 2
  width: 90%;
  height: 2.5rem;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 20;
  justify-content: space-between;
  background-color: #81d4fa;
  opacity: 0.8;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const OptionWrapper = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: center;
`;

const OptionText = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: bold;
`;

const FaWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColorPickerWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 110%;
  left: 10%;
  width: 80%;
  height: 80%;
  z-index: 50;
`;

export default CanvasOptionBar;
