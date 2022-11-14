/**
 * @author chaeyoon
 */
import { client } from "../utils/client";

/**
 * @description 오늘의 질문 답변모음 받아오기
 */
export const getTodayAnswerList = async () => {
  const result = await client
    .get(`/today/answer`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

/**
 * @description 오늘의 질문 DB에서 가져오기
 */
export const getTodayQuestion = async () => {
  const result = await client
    .get(`/today/question`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};
