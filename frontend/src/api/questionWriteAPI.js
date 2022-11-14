/**
 * @author chaeyoon
 */
import { client } from "../utils/client";

/**
 * @description 오늘의 편지 답변 쓰기
 */
export const saveTextAnswer = async (
  content,
  realUserId,
  realTodayQuestionId
) => {
  const result = await client
    .post(`/today/answer`, {
      answer: content,
      userId: realUserId,
      todayQuestionId: realTodayQuestionId,
    })
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

// export const saveQuestion = async (question, date) => {
// 	const result = await client
// 		.post(`/admin/question`, {
// 			question: question,
// 			date: date,
// 		})
// 		.then((res) => res)
// 		.catch((error) => error.response);
// 	return result;
// };
