import React, { useEffect } from "react";
import { RowCenterWrapper, Wrapper } from "./../../styles/Wrapper";
import { useRecoilValue } from "recoil";
import { userState } from "./../../recoil/Atoms";
import { RoleTypes } from "./../../constants/Roles";
import { Outlet, useNavigate } from "react-router-dom";
import { popWarningAlert } from "./../../utils/sweetAlert";
import BackgroundGradient from "./../../components/atoms/BackgroundGradient";
import Title from "./../../components/atoms/Title";
import { MainSmallText, MainText } from "../../components/atoms/Text";
import styled from "styled-components";
import { SizeTypes } from "../../constants/Sizes";

const AdminPage = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  useEffect(() => {
    const isAdmin = user.role === RoleTypes.ADMIN;

    if (!isAdmin) {
      popWarningAlert(
        "접근 권한 없음",
        "권한이 있는 사용자만 페이지에 접근할 수 있습니다."
      );
      navigate("/");
      return;
    }

    navigate("/admin/reports");
  }, []);

  return (
    <>
      <BackgroundGradient start={"0f2027"} end={"2C5364"} />
      <Wrapper>
        <MenuBarArea>
          <MenuText
            color="black"
            fontWeight="bold"
            margin="2rem 0 0 0"
            padding="0 0 2rem 0"
            borderBottom="4px outset black"
          >
            관리자 메뉴
          </MenuText>
          <MenuText
            color="black"
            margin="0.5rem 0 0.5rem 0"
            padding="2rem"
            hoverEffect
            onClick={() => navigate("/admin/reports")}
          >
            신고 관리
          </MenuText>
          <MenuText
            color="black"
            margin="0.5rem 0 0.5rem 0"
            padding="2rem"
            hoverEffect
            onClick={() => navigate("/admin/userinfos")}
          >
            사용자 관리
          </MenuText>
          <MenuText
            color="black"
            margin="0.5rem 0 0.5rem 0"
            padding="2rem"
            hoverEffect
            onClick={() => navigate("/admin/todayquestions")}
          >
            오늘의 질문 관리
          </MenuText>
        </MenuBarArea>
        <ContentArea>
          <Outlet></Outlet>
        </ContentArea>
      </Wrapper>
    </>
  );
};

const MenuBarArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  height: calc(100vh - ${SizeTypes.PC_HEADER_HEIGHT});
  background-color: #d9d9d9;
  align-items: center;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 8;
  height: calc(100vh - ${SizeTypes.PC_HEADER_HEIGHT});
  background-color: #f5f5f5;
`;

const MenuText = styled(MainSmallText)`
  color: ${(props) => props.color || "white"};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  font-weight: ${(props) => props.fontWeight};
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderBottom};
  pointer: cursor;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    ${(props) =>
      props.hoverEffect &&
      "transition: 0.25s ease; background-color: rgba(128, 75, 64, 0.3);"}
  }
`;

export default AdminPage;
