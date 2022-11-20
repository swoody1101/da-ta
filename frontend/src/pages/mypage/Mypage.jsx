import React from "react";
import styled from "styled-components";
import BackgroundGradient from "../../components/atoms/BackgroundGradient";
import { Wave } from "../../components/atoms/Wave";
import { MypageMenuBar } from "../../components/molecules/mypage/MypageMenubar";
import { MypageContentsBox } from "../../components/organisms/mypage/MypageContentsBox";
import { media } from "../../utils/styleUtil";
import ReportModal from "../../components/organisms/ReportModal";
import { useEffect } from "react";
import { letterState } from "../../recoil/Atoms";
import { useSetRecoilState } from "recoil";
import { SizeTypes } from "../../constants/Sizes";

const Mypage = () => {
  const setLetter = useSetRecoilState(letterState);
  useEffect(() => {
    setLetter({});
  }, []);

  return (
    <>
      <Wraper>
        <MypageWebContents>
          <MypageMenuBar />
          <MypageContentsBox />
        </MypageWebContents>
        <ReportModal />
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
  height: 70%;
  width: 900px;
  margin-top: ${SizeTypes.PC_HEADER_HEIGHT};
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  z-index: 1;
  border-radius: 20px;
  filter: drop-shadow(0px 0px 8px #777);

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
