/**
 * @author mingyu
 */
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { SizeTypes, SIZE_PHONE } from "../../constants/Sizes";

const Header = ({ children, headerShow, height, borderBottom }) => {
  const [bgColor, setBgColor] = useState("transparent");

  useEffect(() => {
    window.scrollY > 0 ? setBgColor("#958dd6") : setBgColor("transparent");
  }, [window.scrollY]);

  return (
    <StyledHeader
      headerShow={headerShow}
      height={height}
      bgColor={bgColor}
      borderBottom={borderBottom}
    >
      {children}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: fixed;
  top: ${(props) => (props.headerShow ? "0" : "-6rem")};
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 500;
  padding: 0 2rem 0 2rem;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  transition: 0.3s ease;

  height: ${(props) =>
    props.height || window.innerWidth > SIZE_PHONE
      ? SizeTypes.PC_HEADER_HEIGHT
      : SizeTypes.MOBILE_HEADER_HEIGHT};
  background-color: ${(props) => props.bgColor || "transparent"};
  border-bottom: ${(props) =>
    props.borderBottom || "1px solid rgba(255,255,255,0.5)"};

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export default Header;
