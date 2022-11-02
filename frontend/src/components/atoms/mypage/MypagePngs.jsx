/**
 * @author boyeon
 */
/**
 * @param width width값
 * @param height height값
 * @param name png이미지의 이름 (.png제외)
 * @param disable 반응형 고려
 */
import styled from "styled-components";
import { media } from "../../../utils/styleUtil";

const MypagePngs = ({ ...props }) => (
  <ImageDiv width={props.width} height={props.height}>
    <img
      src={process.env.PUBLIC_URL + `/assets/images/mypage/${props.name}.png`}
      height={props.height ? props.height : null}
      width={props.width ? props.width : null}
    ></img>
  </ImageDiv>
);

const ImageDiv = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  ${media.tablet1`
    display: none;
  `}
`;

export default MypagePngs;
