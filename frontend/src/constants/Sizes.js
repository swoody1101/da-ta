/**
 * @author mingyu
 * @description 각종 크기에 대한 상수 정의입니다.
 */

// 기기 사이즈 구하기
const deviceWidth = screen.width;
const deviceHeight = screen.height;
const WIDTH_LIMIT = 1000;

// 기기 가로 사이즈
export const SIZE_WIDE = 1280;
export const SIZE_TABLET1 = 1024;
export const SIZE_TABLET2 = 768;
export const SIZE_PHONE = 480;

export const HEADER_HEIGHT = deviceWidth > SIZE_TABLET1 ? "6rem" : "4rem";

export const SizeTypes = {
  PC_LETTER_MARGIN: deviceHeight < WIDTH_LIMIT ? "1rem 0 0 0" : "2rem 0 0 0",
  PC_LETTER_WIDTH: deviceHeight < WIDTH_LIMIT ? "20rem" : "26rem",
  PC_LETTER_HEIGHT: deviceHeight < WIDTH_LIMIT ? "28rem" : "36.4rem",
  MOBILE_LETTER_WIDTH: "90vw",
  MOBILE_LETTER_HEIGHT: "126vw",
  PC_TITLE_HEIGHT: "2rem",
  MOBILE_TITLE_HEIGHT: "2rem",
  PC_CONTENT_HEIGHT: deviceHeight < WIDTH_LIMIT ? "26rem" : "34.4rem",
  MOBILE_CONTENT_HEIGHT: "calc(126vw - 2rem)",

  PC_MAIN_TEXT_SIZE: "1.5rem",
  MOBILE_MAIN_TEXT_SIZE: "1.3rem",
  PC_MAIN_BOTTLE_WIDTH: "30vw",
  PC_MAIN_BOTTLE_HEIGHT: "30vh",
  MOBILE_MAIN_BOTTLE_WIDTH: "50px",
  MOBILE_MAIN_BOTTLE_HEIGHT: "50px",

  // 헤더 높이
  PC_HEADER_HEIGHT: "6rem",
  MOBILE_HEADER_HEIGHT: "4.5rem",
};
