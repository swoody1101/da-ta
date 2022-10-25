import styled from "styled-components";

const BackgroundVideo = () => {
  return (
    <BG>
      <VD loop autoPlay muted>
        <source src={`${process.env.PUBLIC_URL}/assets/video/bg1.mp4`} />
      </VD>
    </BG>
  );
};

const BG = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  position: absolute;
  z-index: -1;
`;

const VD = styled.video`
  width: 100%;
  object-fit: cover;
  height: 99vh;
  -webkit-filter: blur(15px);
`;

export default BackgroundVideo;
