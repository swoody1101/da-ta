import axios from "axios";
import { reissue } from "../api/authAPI";
import { popErrorAlert } from "./sweetAlert";

const BASE_URL = process.env.REACT_APP_REST_API_DOMAIN;
// const BASE_URL = "http://localhost:8080/api/v1";

export const client = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
});

/**
 * 요청 시 인터셉터
 */
client.interceptors.request.use(
	(config) => {
		const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
		// const refreshToken = sessionStorage.getItem("REFRESH_TOKEN");

		if (!accessToken) config.headers["Authorization"] = null;
		else config.headers["Authorization"] = `Bearer ${accessToken}`;

		return config;
	},
	(error) => {
		console.log(error); // error
		return Promise.reject(error);
	}
);

/**
 * 응답 시 인터셉터
 */
client.interceptors.response.use(
	(config) => {
		if (!config) {
		}

		return config;
	},
	async (error) => {
		const {
			config,
			code,
			response: { status },
		} = error;

		/** 서버와 연결이 끊어졌을 시 */
		if (code === "ERR_NETWORK") {
			popErrorAlert("네트워크 연결 오류", "서버와의 연결이 원활하지 않습니다. 네트워크 상태를 확인하시거나, 잠시 후 다시 시도해주세요.");
			return Promise.reject(error);
		}

		/** access token 유효기간 만료 시 */
		if (response && status === 500) {
			// try {
			// 	const originalRequest = error.config;
			// 	const data = await reissue();
			// 	if (data) {
			// 		const { accessToken, refreshToken } = data.data;
			// 		localStorage.removeItem("user");
			// 		localStorage.setItem("user", JSON.stringify(data.data, ["accessToken", "refreshToken"]));
			// 		originalRequest.headers["accessToken"] = accessToken;
			// 		originalRequest.headers["refreshToken"] = refreshToken;
			// 		return await client.request(originalRequest);
			// 	}
			// } catch (error) {
			// 	localStorage.removeItem("user");
			// 	console.log(error);
			// }
			// return Promise.reject(error);
		}

		const isJWT = error.response.data.message.substr(0, 3) === "JWT";
		if (isJWT) {
			// 리프레싵 토큰 재발급 로직
			console.log("리프레시 토큰");
		}

		return Promise.reject(error);
	}
);
