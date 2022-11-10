import axios from "axios";
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
	(error) => {
		if (error.code === "ERR_NETWORK") {
			popErrorAlert("네트워크 연결 오류", "서버와의 연결이 원활하지 않습니다. 네트워크 상태를 확인하시거나, 잠시 후 다시 시도해주세요.");
		}

		const isJWT = error.response.data.message.substr(0, 3) === "JWT";
		if (isJWT) {
			// 리프레싵 토큰 재발급 로직
		}

		return Promise.reject(error);
	}
);
