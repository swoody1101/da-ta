import React from "react";
import styled from "styled-components";
import DropDownInput from "./../atoms/DropDownInput";
import Checkbox from "../atoms/Checkbox";
import Button from "../atoms/Button";

const LetterOptionBox = ({ props }) => {
  return (
    <Container>
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
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20%;
  right: 10%;
  background-color: white;
  width: 20rem;
  height: 20rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  z-index: 10;
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
