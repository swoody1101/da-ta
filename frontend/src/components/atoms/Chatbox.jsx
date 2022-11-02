/**
 * @author chaeyoon
 */
 import React from "react";
 import styled from "styled-components";


 const Chatbox = ({ path }) => {
   return (
     <StyledChatbox>
       <img src = {path}></img>
     </StyledChatbox>
   );
 };

 const StyledChatbox = styled.div`
   width: 100%;
   height: 100%;
   overflow: hidden;
   margin: 0 auto;
   position: absolute;
   z-index: 5000;
   object-fit: cover;
 `;
 
 export default Chatbox;
 
















//ㅡㅡㅡㅡㅡㅡㅡ이걸 변형하거라ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//<div class="box sb4">I'm speech bubble4</div>

// * {
//   margin: 0px;
//   padding: 0px;
// }

// .box {
//   width: 300px;
//   margin: 50px auto;
//   background: #00bfb6;
//   padding: 20px;
//   text-align: center;
//   font-weight: 900;
//   color: #fff;
//   font-family: arial;
//   position: relative;
// }


// .sb4:before {
//   content: "";
//   width: 0px;
//   height: 0px;
//   position: absolute;
//   border-left: 10px solid transparent;
//   border-right: 10px solid #00bfb6;
//   border-top: 10px solid #00bfb6;
//   border-bottom: 10px solid transparent;
//   right: 19px;
//   bottom: -19px;
// }





 //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
 // &::before 처리용으로 참고하십쇼

 /*
const Box = styled(
  styled.div({
    background: "yellow",
    height: "50px",
    width: "50px"
  })
)`
  &::after {
    content: "after";
  }
`;
 */