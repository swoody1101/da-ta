/**
 * @author mingyu
 */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DropDownInput from "./../atoms/DropDownInput";
import Checkbox from "../atoms/Checkbox";
import Button from "../atoms/Button";
import { sizes } from "./../../utils/styleUtil";
import { SIZE_PHONE, SIZE_TABLET1, SIZE_WIDE } from "./../../constants/Sizes";
import { debounce } from "./../../utils/optimizationUtil";

/**
 * @argument optionToggle 옵션창 표시 여부를 제어하는 변수
 */
const LetterOptionBox = ({ optionToggle }) => {
  const [sizeX, setSizeX] = useState(window.innerWidth);
  /**
   * @description 화면크기 재조정시 이벤트, 편지지 옵션창 display 조정
   */
  const handleResize = () => {
    debounce(() => {
      console.log(window.innerWidth);
      setSizeX(window.innerWidth);
    }, 100);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          >
            멋진 편지지
          </Button>
        </ContentElement>
      </ContentBlock>
      <ContentBlock>
        <ContentElement flex="1" fontWeight="bold">
          글씨체
        </ContentElement>
        <ContentElement flex="2">
          <DropDownInput
            itemList={["dffd", "S", "DFdfdf"]}
            width="80%"
            height="2.5rem"
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
            itemList={["dffd", "S", "DFdfdf"]}
            width="80%"
            height="2.5rem"
          ></DropDownInput>
        </ContentElement>
      </ContentBlock>
      <ContentBlock>
        <ContentElement flex="1" fontWeight="bold">
          답장 여부
        </ContentElement>
        <ContentElement flex="2">
          <Checkbox tagName={"답장 허용"} text={"답장 허용"} />
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
  opacity: ${(props) => (props.optionToggle ? "1" : "0")};
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
