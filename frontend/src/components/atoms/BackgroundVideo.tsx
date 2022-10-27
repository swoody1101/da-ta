/**
 * @author mingyu
 */
import styled from "styled-components";

interface VideoStyleProps {
  isBlur: boolean;
}

interface VideoProps extends VideoStyleProps {
  path: string;
}

/**
 *
 * @param path 비디오 경로
 * @param isBlur 블러 여부
 */
const BackgroundVideo = ({ path, isBlur }: VideoProps) => {
  return (
    <BG>
      <VD loop autoPlay muted isBlur={isBlur}>
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
  position: absolute;
  z-index: -1;
`;

const VD = styled.video<VideoStyleProps>`
  width: 100%;
  object-fit: cover;
  height: 99vh;
  ${(props) => (props.isBlur ? "-webkit-filter: blur(15px)" : "")};
`;

export default BackgroundVideo;
