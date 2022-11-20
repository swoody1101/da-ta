/**
 * @author mingyu
 */
import styled from "styled-components";

/**
 *
 * @param path 비디오 경로
 * @param isBlur 블러 여부
 */
const BackgroundVideo = ({ path, blurOpacity }) => {
  return (
    <BG>
      <VD loop autoPlay muted playsInline blurOpacity={blurOpacity}>
        <source src={path} />
      </VD>
    </BG>
  );
};

BackgroundVideo.defaultProps = {
  path: `${process.env.PUBLIC_URL}/assets/video/bg1.mp4`,
  isBlur: false,
};

const BG = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  position: fixed;
  z-index: -1;
`;

const VD = styled.video`
  width: 100%;
  object-fit: cover;
  height: 99.5vh;
  ${(props) =>
    props.blurOpacity && `-webkit-filter: blur(${props.blurOpacity}px) `};
`;

export default BackgroundVideo;
