import { client } from "./../utils/client";
/**
 * @author mingyu
 */

/**
 * @description 편지지 목록 불러오기
 */
export const getLetterBackgrounds = async () => {
  const result = await client
    .get(`/letters/backgrounds`)
    .then((response) => response)
    .then((resp) => console.log(resp))
    .catch((error) => error);
  return result;
};
