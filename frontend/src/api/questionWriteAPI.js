/**
 * @author chaeyoon
 */
import { client } from "../utils/client";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/Atoms";
import { LetterOptions } from "./../constants/Options";

/**
 * @description 오늘의 편지 텍스트 쓰기
 */
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
