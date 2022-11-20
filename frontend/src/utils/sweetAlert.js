/**
 * @author mingyu
 */
import Swal from "sweetalert2";

/**
 * @description 성공 시 알림창
 * @param title 제목
 * @param text 내용
 */
export const popSuccessAlert = (title, text) => {
  Swal.fire({
    icon: "success",
    title: title,
    html: text,
    closeButtonHtml: "확인",
  });
};

/**
 * @description 사용자의 확인/취소 단계가 필요할 시 알림창
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
    html: text,
    showCancelButton: true,
    confirmButtonText: confirmButtonText ? confirmButtonText : "확인",
    cancelButtonText: cancelButtonText ? cancelButtonText : "취소",
  }).then((result) => {
    if (result.isConfirmed && callBackFunction) callBackFunction();
  });
};

/**
 * @description 경고 알림창
 * @param title 제목
 * @param text 내용
 */
export const popWarningAlert = (title, text) => {
  Swal.fire({
    icon: "warning",
    title: title,
    html: text,
    closeButtonHtml: "확인",
  });
};

/**
 * @description 오류 시 알림창
 * @param title 제목
 * @param text 내용
 */
export const popErrorAlert = (title, text) => {
  Swal.fire({
    icon: "error",
    title: title,
    html: text,
    closeButtonHtml: "확인",
  });
};
