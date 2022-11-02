/**
 * @author chaeyoon
 */
import React from "react";
import styled, { keyframes } from "styled-components";

// const movemouse = keyframes`
// 0% {
//     transform: translate(0, 0);
//     opacity: 0;
//   }
//   40% {
//     opacity: 1;
//   }
//   80% {
//     transform: translate(0, 20px);
//     opacity: 0;
//   }
//   100% {
//     opacity: 0;
//   }
// `;

const MouseScrollDown = ({  }) => {
    return (
     <BG>
        {/* <MouseScroll>
            


        </MouseScroll> */}
     </BG>
   );
};
 
//  MouseScroll.defaultProps = {
//     width: "1rem",
//     height: "2rem",
//     isRight: "1"
//   };

//   BG.defaultProps = {
//     maxwidth: "1rem",
//     maxheight: "2rem",
//   };


 const BG = styled.div`
   maxwidth: ${(props) => props.maxwidth};
   maxheight: ${(props) => props.maxheight};
   overflow: hidden;
   position: absolute;
   z-index: 5;
 `;

//  const MouseScroll = styled.div`
//     position: absolute;
//     top: 0;
//     left: 50%;
//     width: ${(props) => props.width};
//     height: ${(props) => props.height};
//     margin-left: -15px;
//     border: 2px solid #fff;
//     border-radius: 50px; 
//     box-sizing: border-box;
//     animation: ${(props) => props.isRight ? movemouse : 0 } 2s infinite;
//  `;
 
 export default MouseScrollDown;














// a {
//     padding-top: 60px;
//   }
//   a span {
//     position: absolute;
//     top: 0;
//     left: 50%;
//     width: 30px;
//     height: 50px;
//     margin-left: -15px;
//     border: 2px solid #fff;
//     border-radius: 50px;
//     box-sizing: border-box;
//   }
//   a span::before {
//     position: absolute;
//     top: 10px;
//     left: 50%;
//     content: '';
//     width: 6px;
//     height: 6px;
//     margin-left: -3px;
//     background-color: #fff;
//     border-radius: 100%;
//     animation: sdb 2s infinite;
//     box-sizing: border-box;
//   }

//   @keyframes sdb {
//     0% {
//       transform: translate(0, 0);
//       opacity: 0;
//     }
//     40% {
//       opacity: 1;
//     }
//     80% {
//       transform: translate(0, 20px);
//       opacity: 0;
//     }
//     100% {
//       opacity: 0;
//     }
//   }