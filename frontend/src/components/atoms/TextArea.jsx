/**
 * @author mingyu
 */
import styled from "styled-components";
import { SizeTypes } from "./../../constants/Sizes";

export const LetterTextArea = styled.textarea`
  display: flex;
  resize: none;
  border: none;
  z-index: 10;
  width: 100%;
  height: ${screen.width > 480
    ? SizeTypes.PC_CONTENT_HEIGHT
    : SizeTypes.MOBILE_CONTENT_HEIGHT};
  padding: 1rem;
  box-sizing: border-box;
  background: transparent;
  font-family: ${(props) => props.fontFamily || ""};
  font-size: 1rem;
  line-height: 1.5rem;
  color: black;

  &:focus {
    outline: none;
  }
`;

export const QuestionTextArea = styled.textarea`
  display: flex;
  resize: none;
  border: 1px solid #d9d9d9;
  border-radius: 1em;
  z-index: 10;
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  background: transparent;
  font-size: 1rem;
  line-height: 1.5rem;
  color: black;

  &:focus {
    outline: none;
  }
`;
