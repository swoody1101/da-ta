/**
 * @author mingyu
 */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DropDownInput from "./../atoms/DropDownInput";
import Checkbox from "../atoms/Checkbox";
import Button from "../atoms/Button";
import { sizes } from "./../../utils/styleUtil";
import { SIZE_WIDE } from "./../../constants/Sizes";
import { debounce } from "./../../utils/optimizationUtil";
import { LetterOptions } from "./../../constants/Options";

/**
 * @argument optionToggle 옵션창 표시 여부를 제어하는 변수
 */
const LetterOptionBox = ({
  optionToggle,
  sizeX,
  options,
  setOptions,
  setModalToggle,
}) => {
  const onCheckHandler = (e) => {
    setOptions({ ...options, [e.target.name]: !options.allowReply });
  };

  const onDropdownHandler = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.value });
  };

  return (
    <Container optionToggle={optionToggle} sizeX={sizeX}>
      <PinImg
        src={`${process.env.PUBLIC_URL}/assets/images/common/pin.png`}
        width="40px"
        height="54px"
      />
      <ContentBlock>
        <ContentElement flex="1" fontWeight="bold">
          편지지
        </ContentElement>
        <ContentElement flex="2">
          <Button
            color="black"
            shadow={true}
            bgOpacity="1"
            hoverBgOpacity="0.5"
            width="80%"
            height="2.2rem"
            borderRadius="32px"
            onClick={setModalToggle}
          >
            {options.paper}
          </Button>
        </ContentElement>
      </ContentBlock>
      <ContentBlock>
        <ContentElement flex="1" fontWeight="bold">
          글씨체
        </ContentElement>
        <ContentElement flex="2">
          <DropDownInput
            name="font"
            itemList={LetterOptions.FONTS}
            width="80%"
            height="2.8rem"
            onChange={onDropdownHandler}
          ></DropDownInput>
        </ContentElement>
      </ContentBlock>
      <ContentBlock>
        <ContentElement flex="1" fontWeight="bold">
          수신자
          <br />
          연령대
        </ContentElement>
        <ContentElement flex="2">
          <DropDownInput
            name="age"
            itemList={LetterOptions.AGES}
            width="80%"
            height="2.8rem"
            onChange={onDropdownHandler}
          ></DropDownInput>
        </ContentElement>
      </ContentBlock>
      <ContentBlock>
        <ContentElement flex="1" fontWeight="bold">
          답장 여부
        </ContentElement>
        <ContentElement flex="2">
          <Checkbox
            tagName={"allowReply"}
            text={"답장 허용"}
            onCheckHandler={onCheckHandler}
          />
        </ContentElement>
      </ContentBlock>
    </Container>
  );
};

const Container = styled.div`
  display: ${(props) =>
    props.optionToggle || props.sizeX > SIZE_WIDE ? "flex" : "none"};
  flex-direction: column;
  position: absolute;
  top: ${(props) => (props.optionToggle ? "20%" : "20%")};
  right: ${(props) => (props.optionToggle ? "" : "5%")};
  background-color: white;
  width: 20rem;
  height: 20rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  z-index: 10;
  opacity: ${(props) =>
    props.optionToggle || props.sizeX > SIZE_WIDE ? "1" : "0"};
  transition: 0.25s ease;
`;

const PinImg = styled.img`
  display: flex;
  position: absolute;
  top: -2rem;
  width: 40px;
  height: 54px;
`;

const ContentBlock = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
`;

const ContentElement = styled.div`
  display: flex;
  flex: ${(props) => props.flex};
  font-weight: ${(props) => props.fontWeight};
  font-size: 1.2rem;
  // border: 1px solid black;
  align-items: center;
  justify-content: center;
`;

export default LetterOptionBox;
