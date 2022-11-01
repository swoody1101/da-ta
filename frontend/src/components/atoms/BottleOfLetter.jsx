/**
 * @author chaeyoon
 */
 import React from "react";
 import styled from "styled-components";

 /**
  *
  * @param path 물병 사진 경로
  */

 const BottleOfLetter = ({ path }) => {
   return (
     <BG>
       <img src = {path}></img>
     </BG>
   );
 };
 
 BottleOfLetter.defaultProps = {
    path: `${process.env.PUBLIC_URL}/assets/images/common/bottle_of_letter.png`,
  };

 const BG = styled.div`
   width: 100%;
   height: 100%;
   overflow: hidden;
   margin: 0 auto;
   position: absolute;
   z-index: 5000;
   object-fit: cover;
 `;
 
//  const BottleImage = styled.img`
//    width: 20vw;
//    height: 20vh;
//  `;
 
 export default LetterOfBottle;
 