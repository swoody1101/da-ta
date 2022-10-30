import React from "react";
import styled from "styled-components";

const Header = ({ children, ...props }) => {
	return <StyledHeader height={props.height} bgColor={props.bgColor}></StyledHeader>;
};

const StyledHeader = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: height: ${(props) => props.height || "56px"};
  background-color: ${(props) => props.bgColor || "transparent"};
`;

export default Header;
