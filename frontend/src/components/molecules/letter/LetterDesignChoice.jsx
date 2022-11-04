import React from "react";
import styled from "styled-components";
import { media } from "../../../utils/styleUtil";
import { MainText } from "./../../atoms/Text";

const LetterDesignChoice = ({ name, path, text, onClick }) => {
  return (
    <Container onClick={onClick}>
      <ThumbnailImage name={name} src={path} alt={name} />
      <ThumbnailText name={name} fontWeight="bold">
        {text}
      </ThumbnailText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 10rem;

  ${media.phone`
    width: 90%;
  `};
`;

const ThumbnailImage = styled.img`
  display: flex;
  width: 100%;
  height: 80%;
  border-radius: 8px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.3);
  object-fit: cover;
`;

const ThumbnailText = styled(MainText)`
  color: black;
  font-size: 1.1rem;
  height: 20%;
`;

export default LetterDesignChoice;
