import { createGlobalStyle } from "styled-components";
import ChosunCentennial_ttf from "./ChosunCentennial_ttf.ttf";
import HANBatang from "./HANBatang.ttf";
import PretendardMedium from "./Pretendard-Medium.ttf";
import SUIT from "./SUIT-Medium.ttf";
import drfont from "./drfont_daraehand_Basic.ttf";
import DalseoHealingMedium from "./DalseoHealingMedium.ttf";

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
    font-family: "SUIT";
    src: local("SUIT-Medium"),
    url(${SUIT}) format("woff");
    font-style: normal;
  }
  @font-face {
    font-family: "교보손글씨";
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/KyoboHand.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "다래손글씨";
    src: local("drfont_daraehand_Basic"),
    url(${drfont}) format("woff");
    font-style: normal;
  }
  @font-face {
    font-family: '휴먼범석체';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Humanbumsuk.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'HBIOS-SYS';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2207-01@1.0/HBIOS-SYS.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: '카페24 써라운드';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24Ssurround.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: '리디바탕';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

`;

/**
 * @copyright 함초롬 바탕체 - (주)한글과컴퓨터
 * @copyright 휴먼범석체 - 이범석
 * @copyright 카페24 써라운드 - 카페24
 * @copyright 리디바탕 - 리디주식회사
 */
