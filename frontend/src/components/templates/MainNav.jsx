/**
 * @author mingyu
 */
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { media } from "../../utils/styleUtil";
import Header from "../atoms/Header";
import TranslucentBackground from "../atoms/TranslucentBackground";
import SlideMenu from "../organisms/SlideMenu";
import Button from "./../atoms/Button";
import LogoImage from "./../molecules/LogoImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { loginState } from "./../../recoil/Atoms";

const MainNav = () => {
  const navigate = useNavigate();

  const [scrollY, setScrollY] = useState(0); // 높이 스크롤 값
  const [headerShow, setHeaderShow] = useState(true); // 헤더 show 여부
  const [headerMobileMode, setHeaderMobileMode] = useState(false); // pc모드인지 모바일모드인지 여부
  const [slideMenuToggle, setSlideMenuToggle] = useState(false); // 슬라이딩메뉴 토클
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const handleHeaderShow = () => {
    if (window.scrollY === 0 || window.scrollY - scrollY < 0) {
      setHeaderShow(true);
    } else {
      setHeaderShow(false);
    }
    setScrollY(window.scrollY);
  };

  const handleHeaderMode = () => {
    setHeaderMobileMode(window.innerWidth <= 1280 ? true : false);
  };

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    setIsLogin(false);
  };

  useEffect(() => {
    handleHeaderMode();
    handleHeaderShow();
  }, []);

  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);

  useEffect(() => {
    window.addEventListener("scroll", handleHeaderShow);
    window.addEventListener("resize", handleHeaderMode);
    return () => {
      window.removeEventListener("scroll", handleHeaderShow);
      window.removeEventListener("resize", handleHeaderMode);
    };
  });

  return (
    <Header headerShow={headerShow}>
      {headerMobileMode ? (
        <>
          <MobileLogo
            src={`${process.env.PUBLIC_URL}/assets/logo/data_logo.png`}
            height="64px"
            onClick={() => navigate("/")}
          />
        </>
      ) : (
        <>
          <LogoImage onClick={() => navigate("/")}>DA-TA</LogoImage>
        </>
      )}

      {headerMobileMode ? (
        <HamburgerButtonWrapper>
          <Button
            hasBorder={false}
            width={"4rem"}
            height={"4rem"}
            onClick={() => setSlideMenuToggle(true)}
          >
            <FontAwesomeIcon
              icon={faBars}
              size="2x"
              style={{ filter: "drop-shadow(0.25rem 0.25rem 0.25rem black)" }}
            />
          </Button>
          {slideMenuToggle && (
            <TranslucentBackground onClick={() => setSlideMenuToggle(false)} />
          )}
          <SlideMenu
            show={slideMenuToggle}
            setSlideMenuToggle={setSlideMenuToggle}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            isLogin={isLogin}
          />
        </HamburgerButtonWrapper>
      ) : (
        <>
          <HeaderContents>
            <HeaderContent onClick={() => navigate("/")}>
              편지 쓰기
            </HeaderContent>
            <HeaderContent onClick={() => navigate("/")}>
              편지 읽기
            </HeaderContent>
            <HeaderContent onClick={() => navigate("/")}>
              마이페이지
            </HeaderContent>
          </HeaderContents>
          <AuthWrapper>
            {isLogin ? (
              <>
                <Button
                  hoverBgOpacity="0.3"
                  fontSize="1.2rem"
                  height="3rem"
                  width="11rem"
                  margin="0 -3.5rem 0 0 "
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleLogin}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/auth/kakao_login.png`}
                  />
                </Button>
              </>
            )}
          </AuthWrapper>
        </>
      )}
    </Header>
  );
};

const MobileLogo = styled.img`
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 1rem;
  padding: 1rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const HeaderContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderContent = styled.div`
  display: flex;
  margin: 0 2rem 0 2rem;
  padding: 1rem;
  cursor: pointer;
  text-shadow: 1px 1px black;
  transition: 0.3s ease;

  &:hover {
    color: #ffc08c;
  }

  ${media.wide`
		margin: 0 0.5rem 0 0.5rem;
	`}
`;

const AuthWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 12rem;
  align-items: center;
  justify-content: center;
`;

const HamburgerButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 5rem;
  align-items: center;
  justify-content: center;
`;

export default MainNav;
