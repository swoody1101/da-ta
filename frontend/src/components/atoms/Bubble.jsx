/**
 * @author chaeyoon
 */
import React from "react";
import styled, { keyframes } from "styled-components";

const Bubble = ({ ...props }) => {
  return (
    <>
        <StyledDiv {...props}></StyledDiv>
    </>
  );
};

//Bottom은 0퍼에서부터 하나씩 뽀글뽀글 올라오고 거의 10개정도
const moveFromTheBottomBubble = keyframes`
  0% {
    transform: scale(.15, .15);
    top: 100%;
    opacity: 0;
  }
  50% {
    transform: scale(1.1, 1.1);
    opacity: 1;
  }
  100% {
    transform: scale(.33, .33);
    top: 0%;
    opacity: 0;
  }
`;

//middle은 한 20퍼에서부터 하나씩 뽀글뽀글 올라오고 거의 3개정도
const moveFromTheMiddleBubble = keyframes`
0% {
  transform: scale(.15, .15);
  top: 80%;
  opacity: 0;
}
50% {
  transform: scale(1.1, 1.1);
  opacity: 1;
}
100% {
  transform: scale(.33, .33);
  top: 20%;
  opacity: 0;
}
`;

Bubble.defaultProps = {
	bgOpacity: "0",
	hoverBgOpacity: "0",
	height: "2rem",
	width: "4rem",
	borderRadius: "10rem",
	borderSize: "3px",
  frequency: "1.5",
};

//이 StyledDiv는 온전히 버블하나의 세로 영역을 담당합니다
const StyledDiv = styled.div`
    display: absolute;
    background-color: rgba(217, 217, 217, ${(props) => props.bgOpacity}); 
    margin-top: ${(props) => props.margin_top};
    left: ${(props) => props.left};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: ${(props) => (props.borderSize)} solid white;
    border-radius: ${(props) => props.borderRadius};
    color: white;
    animation: ${(props) => props.isRight ? moveFromTheBottomBubble : moveFromTheMiddleBubble } ${(props) => props.frequency}s infinite;
    background-position: 
    `;



//이 부분은 원래 const StyledBubble = styled.div` 에 있었지만 일단 밖으로 내놓은 부분
// background-color : lighten($color, 7%);
// transition: all 0.25s ease-in;
// border: ${(props) => (props.hasBorder ? "4px solid white" : "0")};

export default Bubble;


// 기본으로 있을 내용

// position : absolute;
// border-raduis : 100%
// opacity : 0;

// 추가로 변경 예정

// margin-top
// left
// width
// height
// background-color
// animation : ${(props) => props.frequency}s infinite;


// animation: ${(props) => props.isRight ? moveRight : moveLeft} ${(props) => props.frequency}s linear infinite;


//일부만 따온 코드

// .bubble {
//   position: absolute;
//   border-radius: 100%;
//   opacity: 0;
// } 
// .bubble:nth-child(1) {
//   margin-top: 2.5vh;
//   left: 58%;
//   width: 2.5vh;
//   height: 2.5vh;
//   background-color: lighten($color, 7%);
//   animation: bubble 2s infinite;
// }







//이 부분은 현재 html(pug)임 변환
//변환하면 아래와 같다

{/* <div id="cooking"></div>
<div class="bubble"></div>
<div class="bubble"></div>
<div class="bubble"></div>
<div class="bubble"></div>
<div class="bubble"></div> */}




















//bubble 1 2 3 4 5 child로 하는게 아니고,
//bytest-wave같이 하나하나 값 다르게 해서 진행.


// 아래의 이 부분은 전부 bubble animation과 관련된 부분이다. 


// $color: #333; // the rest

// body {
//   height: 100vh;
//   width: 100vw;
//   overflow: hidden;
// }



// #cooking {
//   position: relative;
//   margin: 0 auto;
//   top: 0;
//   width: 75vh;
//   height: 75vh;
//   overflow: hidden;
//   .bubble {
//     position: absolute;
//     border-radius: 100%;
//     box-shadow: 0 0 .25vh lighten($color, 10%);
//     opacity: 0;
//   } 
//   .bubble:nth-child(1) {
//     margin-top: 2.5vh;
//     left: 58%;
//     width: 2.5vh;
//     height: 2.5vh;
//     background-color: lighten($color, 7%);
//     animation: bubble 2s cubic-bezier(.53, .16, .39, .96) infinite;
//   }
//   .bubble:nth-child(2) {
//     margin-top: 3vh;
//     left: 52%;
//     width: 2vh;
//     height: 2vh;
//     background-color: lighten($color, 4%);
//     animation: bubble 2s ease-in-out .35s infinite;
//   }
//   .bubble:nth-child(3) {
//     margin-top: 1.8vh;
//     left: 50%;
//     width: 1.5vh;
//     height: 1.5vh;
//     background-color: $color;
//     animation: bubble 1.5s cubic-bezier(.53, .16, .39, .96) .55s infinite;
//   }
//   .bubble:nth-child(4) {
//     margin-top: 2.7vh;
//     left: 56%;
//     width: 1.2vh;
//     height: 1.2vh;
//     background-color: darken($color, 3%);
//     animation: bubble 1.8s cubic-bezier(.53, .16, .39, .96) .9s infinite;
//   }
//   .bubble:nth-child(5) {
//     margin-top: 2.7vh;
//     left: 63%;
//     width: 1.1vh;
//     height: 1.1vh;
//     background-color: darken($color, 6%);
//     animation: bubble 1.6s ease-in-out 1s infinite;
//   }
// }


// @keyframes bubble {
//   0% {
//     transform: scale(.15, .15);
//     top: 80%;
//     opacity: 0;
//   }
//   50% {
//     transform: scale(1.1, 1.1);
//     opacity: 1;
//   }
//   100% {
//     transform: scale(.33, .33);
//     top: 60%;
//     opacity: 0;
//   }
// }