/**
 * @author mingyu
 */
import React from "react";
import styled from "styled-components";

const DropDownInput = ({ itemList, onChange, selectedIndex ,...props }) => {
  return (
    <Container {...props} onChange={onChange}>
      {itemList.map((item, index) => (index===selectedIndex ?
          <option value={item} key={item}>
            {item}
          </option> : 
          <option value={item} key={item} selected>
            {item}
          </option>
      ))}
    </Container>
  );
};

const Container = styled.select`
  background-color: transparent;
  border: none;
  border-bottom: 3px solid #383838;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  box-sizing: border-box;
  padding: 0.6rem 0.4rem;
  transition: 0.2s ease;
  margin: ${(props) => props.margin};

  &:focus {
    outline: none;
  }

  :focus::-webkit-input-placeholder {
    color: black;
  }

  @media screen and (max-width: 480px) {
    width: ${(props) => (props.mWidth ? props.mWidth : props.width)};
  }
`;

Container.defaultProps = {
  width: "16rem",
  background: "none",
  fontSize: "1rem",
};

export default DropDownInput;
