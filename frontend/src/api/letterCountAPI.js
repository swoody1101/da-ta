/**
 * @author chaeyoon
 */
import { client } from "../utils/client";

/**
 * @description 지금까지 닿다 서비스에 띄워진 편지 총개수
 */
export const getLetterNum = async () => {
  const result = await client
    .get(`/letters/count`)
    .then((response) => response)
    .catch((error) => error.response); //오...
  // console.log(result);
  return result;
};
