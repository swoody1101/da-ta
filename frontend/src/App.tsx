import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import BackgroundVideo from "./components/atoms/common/BackgroundVideo";
import LandingPage from "./pages/landing/LandingPage";
import Background from "./styles/Background";

function App() {
  return (
    <div className="App">
      <Background>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </Background>
    </div>
  );
}

export default App;
