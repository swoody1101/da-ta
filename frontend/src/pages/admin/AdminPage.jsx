import React, { useEffect } from "react";
import { Wrapper } from "./../../styles/Wrapper";
import { useRecoilValue } from "recoil";
import { userState } from "./../../recoil/Atoms";
import { RoleTypes } from "./../../constants/Roles";
import { useNavigate } from "react-router-dom";
import { popWarningAlert } from "./../../utils/sweetAlert";

const AdminPage = () => {
	const navigate = useNavigate();
	const user = useRecoilValue(userState);

	useEffect(() => {
		const isAdmin = user.role === RoleTypes.ADMIN;

		if (!isAdmin) {
			popWarningAlert("접근 권한 없음", "권한이 있는 사용자만 페이지에 접근할 수 있습니다.");
			navigate("/");
		}
	}, []);

	return <Wrapper>admin page</Wrapper>;
};

export default AdminPage;
