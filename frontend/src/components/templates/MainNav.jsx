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
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, mypageRouterState, userState } from "./../../recoil/Atoms";
import { clickToKakao } from "../../api/authAPI";
import { SIZE_WIDE } from "./../../constants/Sizes";

const MainNav = () => {
  const navigate = useNavigate();

  const [scrollY, setScrollY] = useState(0); // 높이 스크롤 값
  const [headerShow, setHeaderShow] = useState(true); // 헤더 show 여부
  const [headerMobileMode, setHeaderMobileMode] = useState(false); // pc모드인지 모바일모드인지 여부
  const [slideMenuToggle, setSlideMenuToggle] = useState(false); // 슬라이딩메뉴 토글
  const [speechBubble, setSpeechBubble] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(loginState); // Recoil로 관리하는 로그인 정보
  const [user, setUserState] = useRecoilState(userState);
  const [mypageIndex, setMypageIndex] = useRecoilState(mypageRouterState); // Recoil로 관리하는 현재 마이페이지의 index

  const handleHeaderShow = () => {
    if (window.scrollY <= 0 || window.scrollY - scrollY < 0) {
      setHeaderShow(true);
    } else {
      setHeaderShow(false);
    }
    setScrollY(window.scrollY);
  };

  const handleHeaderMode = () => {
    setHeaderMobileMode(window.innerWidth <= SIZE_WIDE ? true : false);
  };

  const handleLogin = () => {
    clickToKakao();
  };

  const handleLogout = () => {
    setIsLogin(false);
    setUserState({});
    sessionStorage.removeItem("ACCESS_TOKEN");
    window.location.href = "/";
  };

  useEffect(() => {
    handleHeaderMode();
    handleHeaderShow();
  }, []);

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
            borderStyle="0"
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
            <HeaderContent onClick={() => navigate("/write")}>
              편지 쓰기
            </HeaderContent>
            <HeaderContent onClick={() => navigate("/get")}>
              편지 읽기
            </HeaderContent>
            <HeaderContent
              onClick={() => {
                switch (mypageIndex) {
                  case 0:
                    navigate("/mypage/collect");
                    break;
                  case 1:
                    navigate("/mypage/receive");
                    break;
                  case 2:
                    navigate("/mypage/setting");
                    break;
                }
              }}
            >
              마이페이지
            </HeaderContent>
          </HeaderContents>
          <AuthWrapper>
            {isLogin ? (
              <>
                <Button
                  fontSize="1rem"
                  height="3.5rem"
                  width="12rem"
                  margin="0 -3.5rem 0 0"
                  color="white"
                  bgColor="linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);"
                  onMouseOver={() => setSpeechBubble(true)}
                  onMouseOut={() => setSpeechBubble(false)}
                >
                  {user.nickname} 님
                  <SpeechBubble act={speechBubble} onClick={handleLogout}>
                    로그아웃
                  </SpeechBubble>
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
  left: 1.25rem;
  height: 100%;
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

const SpeechBubble = styled.div`
  display: flex;
  position: absolute;
  top: 0rem;
  width: 12rem;
  height: 3.5rem;
  background-color: white;
  border-radius: 8px;
  filter: drop-shadow(0 8px 16px #5778ec);
  transition: 0.2s ease;
  justify-content: center;
  align-items: center;
  color: #383838;
  font-size: 1.2rem;
  font-weight: bold;
  transform: ${(props) => (props.act ? `scaleY(1)` : `scaleY(0)`)};
  transform-origin: 0 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`;

export default MainNav;
