import React from "react";
import { popWarningAlert } from "./../../utils/sweetAlert";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  //const authenticated = useSelector((state) => state.user.value.isLogin);
  const authenticated = false;

  return authenticated ? (
    Component
  ) : (
    <Navigate
      to="/"
      {...popWarningAlert("로그인", "로그인 후 이용해주세요.")}
    />
  );
};

export default PrivateRoute;
