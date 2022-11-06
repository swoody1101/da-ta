import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";
// const BASE_URL = "https://k7b106.p.ssafy.io/api/v1";

export const client = axios.create({
	baseURL: BASE_URL,
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
		console.log(error);
		return Promise.reject(error);
	}
);

/**
 * 응답 시 인터셉터
 */
client.interceptors.response.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
