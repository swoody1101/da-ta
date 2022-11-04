import React from "react";
import { useEffect, useState } from "react";
import BackgroundVideo from "../../components/atoms/BackgroundVideo";
import { Wrapper } from "../../styles/Wrapper";
import styled from "styled-components";
import ReadButtons from "../../components/molecules/ReadButtons";
import ReadLetter from "../../components/molecules/ReadLetter";

const TestBoyeon = () => {
  const [blur, setBlur] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setTimeout(() => {
      setBlur(true);
      setLoading(true);
    }, 1500);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <BackgroundVideo
        isBlur={blur}
        path={`${process.env.PUBLIC_URL}/assets/video/bg2.mp4`}
      />
      <ReadWrapper>
        <ReadLetter></ReadLetter>
        <ReadButtons index={1}></ReadButtons>
      </ReadWrapper>
    </>
  );
};

const ReadWrapper = styled(Wrapper)`
  flex-direction: column;
  align-items: center;
`;
export default TestBoyeon;
