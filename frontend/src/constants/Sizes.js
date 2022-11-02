/**
 * @author mingyu
 * @description 각종 크기에 대한 상수 정의입니다.
 */
const deviceWidth = screen.width;
const deviceHeight = screen.height;
const WIDTH_LIMIT = 1000;

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
};
