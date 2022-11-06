/**
 * @author chaeyoon
 */
 import React from "react";
 import styled, { keyframes } from "styled-components";

 /**
  *
  * @param path 물병 사진 경로
  */

  const moveBottle = keyframes`
  0% {
    margin-top: 0px;
    
  }
  100% {
    margin-top: 30px;
    
  }



  `;

  // top: 80%;
  // @keyframes motion {
    // 	0% {margin-top: 0px;}
    // 	100% {margin-top: 10px;}
    // }
    
    // -webkit-@keyframes motion {
    // 	0% {margin-top: 0px;}
    // 	100% {margin-top: 10px;}
    // }


 const BottleOfLetter = ({ path }) => {
   return (
     <BG>
       <img src = {path}></img>
     </BG>
   );
 };
 
 BottleOfLetter.defaultProps = {
    path: `${process.env.PUBLIC_URL}/assets/images/common/bottle_of_letter.png`,
    maxwidth: "10vh",
    maxheight: "10vh", //원래는 20vh
    isRight: "1"
  };

 const BG = styled.div`
   maxwidth: ${(props) => props.width};
   maxheight: ${(props) => props.height};
   overflow: hidden;
   position: absolute;
   z-index: 1.5;
   animation: ${(props) => props.isRight ? moveBottle : moveBottle } 1.5s linear 0s infinite alternate;
 `;
 




 export default BottleOfLetter;
 


//  .chatbox {animation: motion 0.3s linear 0s infinite alternate; margin-top: 0;
// 	-webkit-animation: motion 0.3s linear 0s infinite alternate; margin-top: 0;
// }