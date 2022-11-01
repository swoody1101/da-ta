import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import LandingPage from "./pages/landing/LandingPage";
import TestPage from "./pages/TestPage";
import TestPageYoon from "./pages/TestPageYoon";
import Background from "./styles/Background";
import TestBoyeon from "./pages/TestBoyeon";
import MainNav from "./components/templates/MainNav";
import LetterWritePage from "./pages/letter_write/LetterWritePage";
import NotFound from "./pages/error/NotFound";
import PrivateRoute from "./pages/error/PrivateRoute";
import SocialLogin from "./pages/SocialLogin";

function App() {
  return (
    <div className="App">
      <Background>
        <BrowserRouter>
          <MainNav />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/testyoon" element={<TestPageYoon />} />
            <Route path="/bytest" element={<TestBoyeon />} />
            <Route path="/auth/oauth" element={<SocialLogin />} />
            {/* <Route
              path="/write"
              element={<PrivateRoute component={<LetterWritePage />} />}
            /> */}
            <Route path="/write" element={<LetterWritePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Background>
    </div>
  );
}

export default App;
