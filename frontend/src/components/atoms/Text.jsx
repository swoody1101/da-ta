/**
 * @author mingyu
 * @description 여기에 텍스트, 라벨과 관련된 스타일 컴포넌트를 작성합니다.
 */
import styled from "styled-components";
import { media } from "../../utils/styleUtil";

export const MainText = styled.p`
  display: flex;
  font-size: ${(props) => props.fontSize || "1.8rem"};
  color: white;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.margin};
  font-weight: ${(props) => props.fontWeight};

  ${media.phone`
  font-size: ${(props) => props.mFont_size};
`}
`;

export const MainTestText = styled.p`
  display: flex;
  font-size: 1.5rem;
  color: black;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.margin};
  font-weight: ${(props) => props.fontWeight};
  z-index: 20;
  word-break: keep-all;

  ${media.phone`
  font-size: ${(props) => props.mFont_size};
`}
`;

export const MainSmallText = styled.p`
  display: flex;
  font-size: ${(props) => props.fontSize || "1.3rem"};
  color: ${(props) => props.color || "white"};
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.margin};
  font-weight: ${(props) => props.fontWeight};

  ${media.phone`
  font-size: ${(props) => props.mFont_size};
`}
`;

export const FooterText = styled.p`
  display: flex;
  font-size: 0.8rem;
  color: white;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.margin};
  font-weight: ${(props) => props.fontWeight};

  ${media.phone`
  font-size: ${(props) => props.mFont_size};
`}
`;

MainText.defaultProps = {
  fontWeight: "600",
};

FooterText.defaultProps = {
  fontWeight: "400",
};
