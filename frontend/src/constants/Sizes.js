const deviceWidth = screen.width;
const deviceHeight = screen.height;

export const SizeTypes = {
  PC_LETTER_MARGIN: deviceWidth < 1600 ? "1rem 0 0 0" : "2rem 0 0 0",
  PC_LETTER_WIDTH: deviceWidth < 1600 ? "20rem" : "26rem",
  PC_LETTER_HEIGHT: deviceWidth < 1600 ? "28rem" : "36.4rem",
  MOBILE_LETTER_WIDTH: "90vw",
  MOBILE_LETTER_HEIGHT: "126VW",
};
