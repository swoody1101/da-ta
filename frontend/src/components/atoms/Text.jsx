/**
 * @author mingyu
 * @description 여기에 텍스트, 라벨과 관련된 스타일 컴포넌트를 작성합니다.
 */
import styled from "styled-components";
<<<<<<< HEAD
=======
import { media } from "../../utils/styleUtil";
>>>>>>> 16159da28ec98d40185446ceff8a85879bdff73b

export const MainText = styled.p`
  display: flex;
  font-size: 1.8rem;
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

export const MainSmallText = styled.p`
  display: flex;
  font-size: 1.3rem;
  color: white;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.margin};
  font-weight: ${(props) => props.fontWeight};

<<<<<<< HEAD
=======
  ${media.phone`
  font-size: ${(props) => props.mFont_size};
`}
`;

>>>>>>> 16159da28ec98d40185446ceff8a85879bdff73b
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
