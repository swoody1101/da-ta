const deviceWidth = screen.width;
const deviceHeight = screen.height;

console.log(deviceHeight);

export const SizeTypes = {
  PC_LETTER_MARGIN: deviceHeight < 1000 ? "1rem 0 0 0" : "2rem 0 0 0",
  PC_LETTER_WIDTH: deviceHeight < 1000 ? "20rem" : "26rem",
  PC_LETTER_HEIGHT: deviceHeight < 1000 ? "28rem" : "36.4rem",
  MOBILE_LETTER_WIDTH: "90vw",
  MOBILE_LETTER_HEIGHT: "126VW",
};
