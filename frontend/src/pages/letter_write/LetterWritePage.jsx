import React, { useState } from "react";
import { CenterWrapper, Wrapper } from "./../../styles/Wrapper";
import LetterToggleButton from "./../../components/atoms/letter_write/LetterToggleButton";

const LetterWritePage = () => {
  const [act, setAct] = useState(true);

  return (
    <>
      <CenterWrapper>
        Letter Write Page
        <LetterToggleButton isActive={act}>편지지</LetterToggleButton>
        <LetterToggleButton isActive={!act}>도화지</LetterToggleButton>
      </CenterWrapper>
    </>
  );
};

export default LetterWritePage;
