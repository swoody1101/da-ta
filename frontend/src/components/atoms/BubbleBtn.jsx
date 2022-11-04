import styled from "styled-components";

export const BubbleBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: 50%;
  color: ${(props) => props.color};
  border: 2px solid ${(props) => props.color};
`;
