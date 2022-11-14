import React from "react";
import { useEffect, useState } from "react";
import BackgroundVideo from "../../components/atoms/BackgroundVideo";
import { Wrapper } from "../../styles/Wrapper";
import styled from "styled-components";
import ReadLetterText from "../../components/molecules/ReadLetterText";
import { useRecoilState } from "recoil";
import ReportModal from "../../components/organisms/ReportModal";
import { letterState, readingLetterIdState } from "../../recoil/Atoms";
import ReadLetterPic from "../../components/molecules/ReadLetterPic";
import { useNavigate } from "react-router-dom";
import { popErrorAlert } from "../../utils/sweetAlert";
import { media } from "../../utils/styleUtil";
import ReadReplyButtons from "../../components/molecules/ReadReplyButtons";

const ReplyReadPage = () => {
  //편지 들어올때 잡고 들어와야댐
  const [readingLetterId, setReadingLetterId] =
    useRecoilState(readingLetterIdState);
  const [letter, setLetter] = useRecoilState(letterState);
  const [isLoading, setIsLoading] = useState(false);
  const [isPicture, setIsPicture] = useState(false);
  const [flip, setFlip] = useState(false);
  const navigate = useNavigate();

  useEffect(async () => {
    if (letter) {
      letter.originLetterInfo.imageLetterUrl
        ? setIsPicture(true)
        : setIsPicture(false);
      setIsLoading(true);
    } else {
      navigate("/");
      popErrorAlert("", "올바른 접근이 아닙니다!");
    }
    setTimeout(() => {
      setFlip(true);
    }, 2000);
  }, []);

  return (
    <>
      <ReadWrapper>
        <CenterWrap>
          <FlipFrontDiv actFlip={flip}>
            {isLoading &&
              (isPicture ? (
                <>
                  <ReadLetterPic info={letter.originLetterInfo}></ReadLetterPic>
                </>
              ) : (
                <>
                  <ReadLetterText
                    info={letter.originLetterInfo}
                    nickname={""}
                  ></ReadLetterText>
                </>
              ))}
          </FlipFrontDiv>
          <EmptyBox />
        </CenterWrap>
        <CenterWrap>
          <FlipBackDiv actFlip={flip}>
            <ReadLetterText
              info={letter.replyInfo}
              nickname={letter.replyInfo.writerNickname}
            ></ReadLetterText>
          </FlipBackDiv>
          <ReadReplyButtons />
        </CenterWrap>
        <ReportModal />
      </ReadWrapper>
      <BackgroundVideo
        isBlur={true}
        path={`${process.env.PUBLIC_URL}/assets/video/bg2.mp4`}
      />
    </>
  );
};

const ReadWrapper = styled(Wrapper)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CenterWrap = styled.div`
  position: absolute;
`;

const FlipFrontDiv = styled.div`
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-perspective: 0;
  -webkit-transition: 1s;
  backface-visibility: hidden; /*뒷면 숨기기*/
  visibility: visible;
  transition: 1s;
  transform: rotateY(0deg);
  ${(props) => props.actFlip && "transform: rotateY(180deg)"};
`;

const FlipBackDiv = styled.div`
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-perspective: 0;
  -webkit-transition: 1s;
  backface-visibility: hidden; /*뒷면 숨기기*/
  visibility: visible;
  transition: 1s;
  transform: rotateY(-180deg);
  ${(props) => props.actFlip && "transform: rotateY(0deg)"};
`;

const EmptyBox = styled.div`
  width: 500px;
  height: 60px;
  ${media.phone`
    width: 100%;
    height: 9vh;
  `}
`;

export default ReplyReadPage;
