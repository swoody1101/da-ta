/**
 * @author mingyu
 */
import Swal from "sweetalert2";

/**
 *
 * @param title 제목
 * @param text 내용
 */
export const popSuccessAlert = (title, text) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
  });
};

/**
 *
 * @param title 제목
 * @param text 내용
 * @param confirmButtonText 확인 버튼 이름, 바꾸고 싶지 않으면 ""
 * @param cancelButtonText 취소 버튼 이름, 바꾸고 싶지 않으면 ""
 * @param callBackFunction 확인 시 실행할 콜백함수
 */
export const popConfirmAlert = (
  title,
  text,
  confirmButtonText,
  cancelButtonText,
  callBackFunction
) => {
  Swal.fire({
    icon: "warning",
    title: title,
    text: text,
    showCancelButton: true,
    confirmButtonText: confirmButtonText ? confirmButtonText : "확인",
    cancelButtonText: cancelButtonText ? cancelButtonText : "취소",
  }).then((result) => {
    if (result.isConfirmed && callBackFunction) callBackFunction();
  });
};

/**
 *
 * @param title 제목
 * @param text 내용
 */
export const popWarningAlert = (title, text) => {
  Swal.fire({
    icon: "warning",
    title: title,
    text: text,
  });
};

/**
 *
 * @param title 제목
 * @param text 내용
 */
export const popErrorAlert = (title, text) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
  });
};
