import React from "react";
import { useEffect, useState } from "react";
import BackgroundVideo from "../components/atoms/BackgroundVideo";
import { Wrapper } from "../styles/Wrapper";
import styled from "styled-components";
import ReadButtons from "../components/molecules/ReadButtons";
import ReadLetter from "../components/molecules/ReadLetter";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../recoil/Atoms";

const TestBoyeon = () => {
  const [blur, setBlur] = useState(false);
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState({ letterInfo: {} });
  const loadingSpinner = useSetRecoilState(loadingState);

  useEffect(async () => {
    loadingSpinner(true);
    setTimeout(() => {
      setBlur(true);

      //이후에 Api 연결할 예정
      setLetter({
        writerId: 7,
        writerName: "길가다 5만원을 주운 후라이드치킨",
        "reply-option": "ㅇ머",
        floatLetterId: 0,
        letterInfo: {
          letterId: 10,
          title: "메밀꽃 필 무렵",
          content: memilggot,
          imageLetterUrl: null,
          BackgroundId: 0,
          fontId: 1,
          createTime: new Date(),
        },
      });
      setLoading(true);
      loadingSpinner(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading && (
        <ReadWrapper>
          <ReadLetter info={letter.letterInfo}></ReadLetter>
          <ReadButtons index={1}></ReadButtons>
        </ReadWrapper>
      )}

      <BackgroundVideo
        isBlur={blur}
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

const memilggot =
  "메밀꽃 필 무렵은 1936년 《조광》지에 발표된 이효석의 단편소설이다. 소설의 주 무대는 강원도 평창군 봉평면 일대이며, 마치 시처럼 서정적인 표현이 다수 사용되기도 했다. 원제는 《모밀꽃 필 무렵》이나, 현행 맞춤법 규정에 따라 표기한다";
export default TestBoyeon;
