import React from "react";
import { MypageSettingMobile } from "../../components/molecules/MypageSettingMobile";
import { MypageSettingWeb } from "../../components/molecules/MypageSettingWeb";

const Setting = () => {
  return (
    <>
      <MypageSettingWeb />
      <MypageSettingMobile />
    </>
  );
};

export default Setting;
