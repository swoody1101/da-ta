import React from "react";
import styled from "styled-components";

const TranslucentBackground = ({ children, onClick, ...props }) => {
  return (
    <Container onClick={onClick} {...props}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${(props) => props.bgColor};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

Container.defaultProps = {
  bgColor: "rgba(0, 0, 0, 0.5)",
};

export default TranslucentBackground;
