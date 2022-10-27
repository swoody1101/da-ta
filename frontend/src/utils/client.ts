import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";
// const BASE_URL = "https://j7b307.p.ssafy.io/api/v1";

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

/**
 * 요청 시 인터셉터
 */
client.interceptors.request.use(
  (config: any) => {
    const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
    const refreshToken = sessionStorage.getItem("REFRESH_TOKEN");

    if (!accessToken || !refreshToken) config.headers["Authorization"] = null;
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
  (config: any) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
