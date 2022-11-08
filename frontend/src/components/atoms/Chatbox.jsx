/**
 * @author chaeyoon
 */
import React from "react";
import styled from "styled-components";
import { media } from "../../utils/styleUtil";

const Chatbox = () => {
  return <StyledChatbox></StyledChatbox>;
};

const StyledChatbox = styled(
  styled.div({
    width: "50%",
    minWidth: "300px",
    height: "200px",
    padding: "0px",
    background: "#FFFFFF",
    // -webkit-border-radius: "25px",
    webkitBorderRadius: "25px",
    // -moz-border-radius: "25px",
    mozBorderRadius: "25px",
    // border-radius: "25px",
    borderRadius: "25px",
    display: "flex",
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    top: "56%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  })
)`
  &::after {
    content: "";
    display: flex;
    position: absolute;
    border-style: solid;
    border-width: 34px 17px 0;
    border-color: #ffffff transparent;
    width: 0;
    bottom: -34px;
    left: 45%;
  }
`;

export default Chatbox;
