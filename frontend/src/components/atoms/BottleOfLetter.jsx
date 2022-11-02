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
    width: "20vw",
    height: "20vh"
  };

 const BG = styled.div`
   width: ${(props) => props.width};
   height: ${(props) => props.height};
   overflow: hidden;
   margin: 0 auto;
   position: absolute;
   z-index: 5000;
 `;
 
 export default BottleOfLetter;
 