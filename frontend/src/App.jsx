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
import LetterReadPage from "./pages/letter_read/LetterReadPage";
import Mypage from "./pages/mypage/Mypage";
import Collect from "./pages/mypage/Collect";
import Receive from "./pages/mypage/Receive";
import Setting from "./pages/mypage/Setting";
import { GlobalFonts } from "./styles/fonts/fonts";

function App() {
	return (
		<div className="App">
			<GlobalFonts />
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
						<Route path="/read" element={<LetterReadPage />} />
						<Route path="/mypage" element={<Mypage />}>
							<Route index path="collect" element={<Collect />} />
							<Route path="receive" element={<Receive />} />
							<Route path="setting" element={<Setting />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</Background>
		</div>
	);
}

export default App;
