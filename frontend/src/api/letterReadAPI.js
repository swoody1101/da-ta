/**
 * @author boyeon
 */
import { client } from "../utils/client";

export const getLetter = async () => {
  const result = await client
    .get(`/letters`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const tossLetter = async (letterId) => {
  const result = await client
    .put(`/letters/${letterId}`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};
