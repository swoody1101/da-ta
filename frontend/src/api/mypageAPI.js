/**
 * @author boyeon
 */
import { client } from "../utils/client";

/**
 * @description
 */
export const deleteLetter = async (letter_id) => {
  const result = await client
    .delete(`/letters/collection/${letter_id}`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const reportLetter = async (reporter_id, letter_id) => {
  const body = {
    reason: "ㅣ",
  };
  const result = await client
    .post(`/letters/accusation/${reporter_id}/${letter_id}`, body)
    .then((response) => response)
    .catch((error) => error);
  return result;
};
