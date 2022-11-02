/**
 * @author chaeyoon
 */
 import React from "react";
 import styled from "styled-components";

 /**
  *
  * @param path 배경 사진 경로
  */

 const MainBackgroundSky = ({ path }) => (
     <BG>
       <img src = {path}></img>
     </BG>
);
 
 
 MainBackgroundSky.defaultProps = {
    path: `${process.env.PUBLIC_URL}/assets/images/mainpage/main_bg.png`
  };

  const BG = styled.div`
  width: 100vw;
  height: 150vh;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;





 export default MainBackgroundSky;
