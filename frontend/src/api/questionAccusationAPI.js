/**
 * @author chaeyoon
 */
import { client } from "../utils/client";

/**
 * @description 오늘의 답변 목록 중 신고 처리
 */
export const todayAnswerAccusation = async (today_answer_id, data) => {
  const result = await client
    .post(`/today/answer/accusation/${today_answer_id}`, data)
    .then((res) => res)
    .catch((error) => error.response);
  // console.log(result);
  return result;
};
