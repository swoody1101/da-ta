import React from "react";
import { useEffect, useState } from "react";
import BackgroundVideo from "../../components/atoms/BackgroundVideo";
import { Wrapper } from "../../styles/Wrapper";
import styled from "styled-components";
import ReadButtons from "../../components/molecules/ReadButtons";
import ReadLetterText from "../../components/molecules/ReadLetterText";
import { useRecoilState } from "recoil";
import ReportModal from "../../components/organisms/ReportModal";
import { letterState, readingLetterIdState } from "../../recoil/Atoms";
import ReadLetterPic from "../../components/molecules/ReadLetterPic";

const LetterReadPage = () => {
  const [readingLetterId, setReadingLetterId] =
    useRecoilState(readingLetterIdState);
  const [letter, setLetter] = useRecoilState(letterState);
  const [isLoading, setIsLoading] = useState(false);
  const [isPicture, setIsPicture] = useState(false);
  useEffect(async () => {
    setReadingLetterId(letter.letterInfo.letterId);
    letter.letterInfo.imageLetterUrl ? setIsPicture(true) : setIsPicture(false);
    setIsLoading(true);
  }, []);

  return (
    <>
      <ReadWrapper>
        {isLoading &&
          (isPicture ? (
            <>
              <ReadLetterPic info={letter.letterInfo}></ReadLetterPic>
              <ReadButtons index={letter.replyOption ? 0 : 1}></ReadButtons>
            </>
          ) : (
            <>
              <ReadLetterText info={letter.letterInfo}></ReadLetterText>
              <ReadButtons index={letter.replyOption ? 0 : 1}></ReadButtons>
            </>
          ))}
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
export default LetterReadPage;
