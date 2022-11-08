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
          <MenuText color="black">ㅎㅇ</MenuText>
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
`;

export default AdminPage;
