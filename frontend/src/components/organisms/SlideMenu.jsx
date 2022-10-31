import React, { useEffect } from "react";
import styled from "styled-components";
import {
  faX,
  faHouse,
  faPenToSquare,
  faEnvelopeOpenText,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const SlideMenu = ({ show, setSlideMenuToggle }) => {
  const navigate = useNavigate();

  return (
    <>
      <Container show={show}>
        <MenuContent jc={false}>
          <FaWrapper onClick={() => setSlideMenuToggle(false)}>
            <FontAwesomeIcon icon={faX} size="lg" />
          </FaWrapper>
        </MenuContent>
        <Spacer />
        <MenuContent jc={true} onClick={() => navigate("/")}>
          홈{" "}
          <FaWrapper>
            <FontAwesomeIcon icon={faHouse} />
          </FaWrapper>
        </MenuContent>
        <MenuContent jc={true} onClick={() => navigate("/")}>
          편지 쓰기
          <FaWrapper>
            <FontAwesomeIcon icon={faPenToSquare} />
          </FaWrapper>
        </MenuContent>
        <MenuContent jc={true} onClick={() => navigate("/")}>
          편지 받기
          <FaWrapper>
            <FontAwesomeIcon icon={faEnvelopeOpenText} />
          </FaWrapper>
        </MenuContent>
        <MenuContent jc={true} onClick={() => navigate("/")}>
          마이페이지
          <FaWrapper>
            <FontAwesomeIcon icon={faGear} />
          </FaWrapper>
        </MenuContent>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  z-index: 1001;
  right: ${({ show }) => {
    return show ? "0vw" : "-100vw";
  }};
  transition: 1s all;
  height: 100%;
  width: 70vw;
  background: linear-gradient(to bottom right, #958dd6, #5778ec);
  align-items: center;
  padding: 1rem 0 1rem 0;
`;

const MenuContent = styled.div`
  display: flex;
  width: 80%;
  height: 2rem;
  border-bottom: ${(props) => (props.jc ? "1px solid navy" : "0")};
  padding: 1.5rem 10% 1.5rem 10%;
  align-items: center;
  justify-content: ${(props) => (props.jc ? "start" : "end")};
`;

const Spacer = styled.div`
  display: flex;
  width: 100%;
  height: 0.5rem;
  background-color: rgba(250, 250, 250, 0.5);
`;

const FaWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 2rem;
  align-items: center;
  justify-content: center;
`;

export default SlideMenu;
