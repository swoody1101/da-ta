/**
* @author chaeyoon
*/

 import styled from "styled-components";

 const MainSeaGradient = () => (
   <BG/>
 );
 
 const BG = styled.div`
   width: 100vw;
   height: 100vh;
   overflow: hidden;
   position: absolute;
   background: linear-gradient(#F17C58,#E94584,#24AADB,#27DBB1,#FFDC18,#FF3706);
   z-index: -1;
 `;

//  background: linear-gradient(#${(props) => (props.start)}, #${(props) => (props.middle)}, #${(props) => (props.end)});

 export default MainSeaGradient;