import { createGlobalStyle } from "styled-components";
import ChosunCentennial_ttf from "./ChosunCentennial_ttf.ttf";
import HANBatang from "./HANBatang.ttf";
import PretendardMedium from "./Pretendard-Medium.ttf";
import SUIT from "./SUIT-Medium.ttf";

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: "함초롬바탕체";
    src: local("HANBatang"),
    url(${HANBatang}) format("woff");
    font-style: normal;
  }
  @font-face {
    font-family: "조선굴림체";
    src: local("ChosunCentennial_ttf"),
    url(${ChosunCentennial_ttf}) format("woff");
    font-style: normal;
  }
  @font-face {
    font-family: "프리텐다드";
    src: local("Pretendard-Medium"),
    url(${PretendardMedium}) format("woff");
    font-style: normal;
  }
  @font-face {
    font-family: "프리텐다드";
    src: local("Pretendard-Medium"),
    url(${PretendardMedium}) format("woff");
    font-style: normal;
  }
  @font-face {
    font-family: "SUIT";
    src: local("SUIT-Medium"),
    url(${SUIT}) format("woff");
    font-style: normal;
  }
  @font-face {
    font-family: '교보손글씨';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/KyoboHand.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

`;

/**
 * @copyright 함초롬 바탕체 - (주)한글과컴퓨터
 */
