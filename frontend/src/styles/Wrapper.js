import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  min-height: calc(100vh - 6rem);
  margin-top: 6rem;
`;

export const CenterWrapper = styled(Wrapper)`
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const RowCenterWrapper = styled(Wrapper)`
  position: relative;
  align-items: center;
  flex-direction: column;
`;

export const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: calc(100vh - 6rem);
  box-sizing: border-box;
  padding: 2rem;
`;
