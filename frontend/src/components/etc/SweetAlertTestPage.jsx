import React from "react";
import {
  popConfirmAlert,
  popErrorAlert,
  popSuccessAlert,
} from "../../utils/sweetAlert";

const handleConfirmClick = async () => {
  popConfirmAlert("성공", "내용임다", "", "", dodo);
};

const handleErrorClick = async () => {
  popErrorAlert("에러", "에러가 났어요");
};

const dodo = () => {
  console.log("do something");
};

const SweetAlertTestPage = () => {
  return (
    <div>
      <button onClick={() => popSuccessAlert("성공", "내용임다")}>
        success
      </button>
      <button onClick={handleConfirmClick}>confirm</button>
      <button onClick={handleErrorClick}>error</button>
    </div>
  );
};

export default SweetAlertTestPage;
