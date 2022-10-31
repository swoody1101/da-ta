import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  min-height: calc(100vh - 6rem);
  margin-top: 6rem;
`;

export const CenterWrapper = styled(Wrapper)`
  justify-content: center;
  align-items: center;
`;
