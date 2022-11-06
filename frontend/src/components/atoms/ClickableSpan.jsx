import styled from "styled-components";

export const ClickableSpan = styled.span`
  margin: ${(props)=>props.margin};
  color: #4FC3F7;
  font-size: ${(props)=>props.fontSize};
  cursor: pointer;
`

ClickableSpan.defaultProps = {
  margin: 0,
  fontSize: '16px',
};