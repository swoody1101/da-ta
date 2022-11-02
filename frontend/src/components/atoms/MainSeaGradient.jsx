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
   background: linear-gradient(#BECCF9,#90CAF9,#64B5F6,#64B5F6,#42A5F5,
    #2196F3,#1E88E5,#1976D2,#2559A9,#003158,
    #001F29);
   z-index: -1;
 `;

//  background: linear-gradient(#${(props) => (props.start)}, #${(props) => (props.middle)}, #${(props) => (props.end)});

 export default MainSeaGradient;