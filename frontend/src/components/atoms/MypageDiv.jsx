import styled from "styled-components";

export const MypageDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.fd ? props.fd : "row")};
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  justify-content: center;
  align-items: center;
  background-color: #${(props) => (props.bc ? props.bc : "FFFFFF")};
  z-index: ${(props) => props.zi};
  border-radius: ${(props) => props.br}px;
`;

MypageDiv.defaultProps = {
  height: "100px",
  width: "100px",
};
