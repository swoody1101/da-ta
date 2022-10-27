import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import LandingPage from "./pages/landing/LandingPage";
import TestPage from "./pages/TestPage";
import Background from "./styles/Background";

function App() {
  return (
    <div className="App">
      <Background>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </BrowserRouter>
      </Background>
    </div>
  );
}

export default App;
