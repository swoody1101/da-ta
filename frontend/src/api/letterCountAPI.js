/**
 * @author chaeyoon
 */
import { client } from "../utils/client";
const BASE_URL = process.env.REACT_APP_REST_API_DOMAIN;
import axios from "axios";

/**
 * @description 지금까지 닿다 서비스에 띄워진 편지 총개수 Login
 */
export const getLetterNumLogin = async () => {
  const result = await client
    .get(`/letters/count`)
    .then((response) => response)
    .catch((error) => error.response);
  // console.log(result);
  return result;
};
/**
 * @description 지금까지 닿다 서비스에 띄워진 편지 총개수 notLogin
 */
export const getLetterNumNotLogin = async () => {
  const result = await axios
    .get(`${BASE_URL}/letters/count`)
    .then((response) => response)
    .catch((error) => error.response);
  // console.log(result);
  return result;
};
