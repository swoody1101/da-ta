import axios from "axios";
import { reissue } from "../api/authAPI";
import { popErrorAlert } from "./sweetAlert";
import { useCookies, Cookies } from "react-cookie";

const BASE_URL = process.env.REACT_APP_REST_API_DOMAIN;
// const BASE_URL = "http://localhost:8080/api/v1";

export const client = axios.create({
  baseURL: BASE_URL,
  // timeout: 5000,
});

/**
 * 요청 시 인터셉터
 */
client.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("ACCESS_TOKEN");

    if (!accessToken) {
      config.headers["Authorization"] = null;
    } else {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
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
  async (error) => {
    /** 서버와 연결이 끊어졌을 시 */
    if (error.code === "ERR_NETWORK") {
      popErrorAlert(
        "네트워크 연결 오류",
        "서버와의 연결이 원활하지 않습니다. 네트워크 상태를 확인하시거나, 잠시 후 다시 시도해주세요."
      );
      return Promise.reject(error);
    }

    /** Access Token이 만료되었을 시 */
    if (error.response.status === 401) {
      // // 1. reissue 요청으로 refresh token 재발급 요청을 한다.
      const response = await reissue();

      if (!response || response.status !== 200) {
        popErrorAlert("오류 발생", "예기치 못한 오류가 발생했습니다.");
        localStorage.removeItem("recoil-persist");
        window.location.href = "/";
        return;
      }

      // // 2. 요청 후 받은 응답에서 access token을 추출해 localstorage에 저장한다.
      const accessToken = response.headers["authorization"];
      sessionStorage.setItem("ACCESS_TOKEN", accessToken);

      // 3. 못보냈던 config를 재전송한다.
      error.config.headers.Authorization = `Bearer ${accessToken}`;

      return await client(error.config);
    }
    return Promise.reject(error);
  }
);
