import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "./../../components/atoms/Title";
import Button from "./../../components/atoms/Button";
import { MainText } from "./../../components/atoms/Text";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>404 NotFound Error</Title>
      <MainText>페이지를 찾을 수 없습니다.</MainText>
      <Button
        margin="2rem 0 0 0"
        width="8rem"
        height="4rem"
        onClick={() => navigate("/")}
      >
        홈
      </Button>
      <Button
        margin="2rem 0 0 0"
        width="8rem"
        height="4rem"
        onClick={() => navigate("/test")}
      >
        테스트
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12rem;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  margin-top: 6rem;
`;

export default NotFound;
