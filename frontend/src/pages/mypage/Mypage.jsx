import React from "react";
import { useState } from "react";
import styled from "styled-components";
import BackgroundGradient from "../../components/atoms/BackgroundGradient";
import { Wave } from "../../components/atoms/Wave";
import { MypageMenuBar } from "../../components/molecules/mypage/MypageMenubar";
import { MypageContentsBox } from "../../components/organisms/mypage/MypageContentsBox";
import { media } from "../../utils/styleUtil";

//Todo : 해수면 높이 올리기
const Mypage = () => {
  // Todo: MenuBar molecule 의 selectedIndex와 같이 전역으로 관리하기
  let [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <Wraper>
        <MypageWebContents>
          <MypageMenuBar />
          <MypageContentsBox />
        </MypageWebContents>
      </Wraper>
      <Wave opacity={0.5} frequency={16} isRight={true}></Wave>
      <Wave opacity={0.3} frequency={8} isRight={true}></Wave>
      <Wave opacity={0.4} frequency={13} isRight={false}></Wave>
      <BackgroundGradient start={"E2AAFD"} end={"FFDFC2"} />
    </>
  );
};

const Wraper = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

const MypageWebContents = styled.div`
  display: flex;
  height: 656px;
  width: 900px;
  margin-top: 6rem;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  z-index: 1;
  border-radius: 20px;

  ${media.tablet1`
    margin-top: 0px;
    width: 100vw;
    height: 100vh;
    border-radius: 0px;
    flex-direction: column;
    justify-content: flex-start;
  `}
`;

export default Mypage;
