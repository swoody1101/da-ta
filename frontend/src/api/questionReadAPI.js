/**
 * @author chaeyoon
 */
import { client } from "../utils/client";
const BASE_URL = process.env.REACT_APP_REST_API_DOMAIN;
import axios from "axios";

/**
 * @description 오늘의 질문 답변모음 받아오기
 */ //수정 예정
export const getTodayQuestionAnswerList = async (listType) => {
  const result = await client
    .get(`/today/answer/${listType}`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

/**
 * @description 오늘의 질문 DB에서 가져오기
 */
export const getTodayQuestionLogin = async () => {
  const result = await client
    .get(`/today/question`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

export const getTodayQuestionNotLogin = async () => {
  const result = await axios
    .get(`${BASE_URL}/today/question`)
    .then((response) => response)
    .catch((error) => error.response);
  console.log(result);
  return result;
};
