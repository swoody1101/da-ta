/**
* @author chaeyoon
*/

 import styled from "styled-components";

 const MainSeaGradient = () => (
   <BG/>
 );
 
 const BG = styled.div`
   display: flex;
   position: absolute;
   width: 100vw;
   height: 300vh;
   overflow: hidden;
   background: linear-gradient(#B6C6F8,#90CAF9,#64B5F6,#64B5F6,#42A5F5,
    #2196F3,#1E88E5,#1976D2,#2559A9,#003158,
    #001F29);
   z-index: -1;
   margin-top: 100vh;
 `;

//  background: linear-gradient(#${(props) => (props.start)}, #${(props) => (props.middle)}, #${(props) => (props.end)});

 export default MainSeaGradient;