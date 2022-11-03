import styled from "styled-components";
import { media } from "../../../utils/styleUtil";
import { SizeTypes } from "./../../../constants/Sizes";

const ContentBlock = styled.div`
  display: flex;
  opacity: ${(props) => (props.optionToggle ? "0" : "1")};
  visibility: ${(props) => (props.optionToggle ? "hidden" : "visible")};
  position: relative;
  flex-direction: ${(props) => props.flexDirection || "row"};
  width: ${SizeTypes.PC_LETTER_WIDTH};
  height: ${(props) => props.height};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  margin: ${(props) => props.margin};
  transition: 0.25s ease;

  ${media.phone`
    width: ${(props) => props.mWidth};
    height: calc(${(props) => props.mHeight});
  `}
`;

export default ContentBlock;
