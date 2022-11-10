/**
 * @author chaeyoon
 */
import { client } from "../utils/client";

/**
 * @description 오늘의 편지 답변 쓰기
 */ //수정 예정
export const saveTextAnswer = async (content) => {
  const body = {
    textAnswerInfo: {
      content: content,
    },
  };

  console.log(body);

  const result = await client
    .post(`/today/question/1`, body)
    .then((response) => response)
    .catch((error) => error);
  return result;
};
