/**
 * @author chaeyoon
 */
import { client } from "../utils/client";

/**
 * @description 오늘의 답변 목록 중 신고 처리
 */
export const todayAnswerAccusation = async (today_answer_id) => {
  const result = await client
    .post(`/today/accusation/${today_answer_id}`)
    .then((res) => res)
    .catch((error) => error.response);
  // console.log(result);
  return result;
};
