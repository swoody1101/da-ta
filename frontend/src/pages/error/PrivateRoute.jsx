import React from "react";
import { popWarningAlert } from "./../../utils/sweetAlert";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "./../../recoil/Atoms";

const PrivateRoute = ({ component: Component }) => {
	const isLogin = useRecoilValue(loginState);

	return isLogin ? Component : <Navigate to="/" {...popWarningAlert("", "로그인 후 이용해주세요.")} />;
};

export default PrivateRoute;
