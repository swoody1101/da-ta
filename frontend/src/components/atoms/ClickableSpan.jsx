import styled from "styled-components";

export const ClickableSpan = styled.span`
  margin: ${(props) => props.margin};
  color: #4fc3f7;
  font-size: ${(props) => props.fontSize};
  cursor: pointer;
  ${(props) => (props.isHide ? "display: none;" : "")}
`;

ClickableSpan.defaultProps = {
  margin: 0,
  fontSize: "16px",
};
