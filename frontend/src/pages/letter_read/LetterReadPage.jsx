import React from "react";
import { useEffect, useState } from "react";
import BackgroundVideo from "../../components/atoms/BackgroundVideo";
import { Wrapper } from "../../styles/Wrapper";
import styled from "styled-components";
import ReadButtons from "../../components/molecules/ReadButtons";
import ReadLetterText from "../../components/molecules/ReadLetterText";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../recoil/Atoms";
import ReportModal from "../../components/organisms/ReportModal";

const LetterReadPage = () => {
  const [blur, setBlur] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadingSpinner = useSetRecoilState(loadingState);
  const [letter, setLetter] = useState({ letterInfo: {} });
  const [isPicture, setIsPicture] = useState(false);

  useEffect(async () => {
    loadingSpinner(true);
    setTimeout(() => {
      setBlur(true);

      //이후에 Api 연결할 예정
      setLetter({
        writerId: 7,
        writerName: "길가다 5만원을 주운 후라이드치킨",
        reply_option: true,
        floatLetterId: 0,
        letterInfo: {
          letterId: 10,
          title: "메밀꽃 필 무렵",
          content: memilggot,
          imageLetterUrl: null,
          backgroundId: 2,
          fontId: 1,
          createTime: new Date(),
        },
      });

      //편지를 출력하기 전에 그림인지 글인지 분기
      letter.letterInfo.imageLetterUrl
        ? setIsPicture(true)
        : setIsPicture(false);

      //편지를 표시
      setLoading(true);
      loadingSpinner(false);
    }, 1000);
  }, []);
  return (
    <>
      <ReadWrapper>
        {loading &&
          (isPicture ? (
            <>
              <ReadLetterText info={letter.letterInfo}></ReadLetterText>
              <ReadButtons index={letter.reply_option ? 0 : 1}></ReadButtons>
            </>
          ) : (
            <>
              <ReadLetterText info={letter.letterInfo}></ReadLetterText>
              <ReadButtons index={letter.reply_option ? 0 : 1}></ReadButtons>
            </>
          ))}
        <ReportModal />
      </ReadWrapper>
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
export default LetterReadPage;
