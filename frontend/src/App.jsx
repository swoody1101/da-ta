import React, { useEffect } from "react";
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
import Loading from "./components/molecules/Loading";
import { useRecoilState } from "recoil";
import { loadingState, loginState, userState } from "./recoil/Atoms";
import { firestore } from "./firebase-config";
import LetterWriteSuccessPage from "./pages/letter_write/LetterWriteSuccessPage";
import AdminPage from "./pages/admin/AdminPage";
import Reports from "./pages/admin/Reports";
import UserInfos from "./pages/admin/UserInfos";
import TodayQuestions from "./pages/admin/TodayQuestions";
import LetterGetPage from "./pages/letter_read/LetterGetPage";

function App() {
	const [loading, setLoading] = useRecoilState(loadingState);
	const [isLogin, setIsLogin] = useRecoilState(loginState);
	const [user, setUser] = useRecoilState(userState);

	useEffect(() => {
		if (isLogin && !sessionStorage.getItem("ACCESS_TOKEN")) {
			setUser({});
			setIsLogin(false);
			window.location.href = "/";
		}
	}, []);

	return (
		<div className="App">
			<GlobalFonts />
			{loading && <Loading />}
			<Background>
				<BrowserRouter>
					<MainNav />
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/test" element={<TestPage />} />
						<Route path="/testyoon" element={<TestPageYoon />} />
						<Route path="/bytest" element={<TestBoyeon />} />
						<Route path="/auth/oauth" element={<SocialLogin />} />
						<Route path="/admin" element={<PrivateRoute component={<AdminPage />} />}>
							<Route index path="reports" element={<PrivateRoute component={<Reports />} />} />
							<Route path="userinfos" element={<PrivateRoute component={<UserInfos />} />} />
							<Route path="todayquestions" element={<PrivateRoute component={<TodayQuestions />} />} />
						</Route>
						<Route path="/write" element={<PrivateRoute component={<LetterWritePage />} />} />
						<Route path="/writesuccess" element={<PrivateRoute component={<LetterWriteSuccessPage />} />} />
						<Route path="/get" element={<PrivateRoute component={<LetterGetPage />} />} />
						<Route path="/read" element={<PrivateRoute component={<LetterReadPage />} />} />
						<Route path="/mypage" element={<PrivateRoute component={<Mypage />} />}>
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
