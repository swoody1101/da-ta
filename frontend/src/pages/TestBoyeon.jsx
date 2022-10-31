import React from "react";
import BackgroundGradient from "../components/atoms/BackgroundGradient";
import Wave from "../components/atoms/Wave";

const TestBoyeon = () => (
  <>
    <Wave opacity={.5} frequency={16} isRight={true}></Wave>
    <Wave opacity={.3} frequency={8} isRight={true}></Wave>
    <Wave opacity={.4} frequency={13} isRight={false}></Wave>
    <BackgroundGradient start={'E2AAFD'} end={'FFDFC2'}/>
  </>
)

export default TestBoyeon
