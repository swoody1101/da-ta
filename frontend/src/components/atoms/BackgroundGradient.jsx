/**
 * @author boyeon
 */
/**
 *
 * @param start 시작 hex값
 * @param end 끝 hex값
 */
import styled from "styled-components";

const BackgroundGradient = ({ start, end, height }) => (
  <BG start={start} end={end} height={height} />
);

const BG = styled.div`
  width: 100vw;
  height: ${(props) => props.height || "100vh"};
  overflow: hidden;
  position: absolute;
  background: linear-gradient(
    #${(props) => props.start},
    #${(props) => props.end}
  );
  z-index: -1;
`;

export default BackgroundGradient;
