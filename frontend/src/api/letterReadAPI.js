/**
 * @author boyeon
 */
import { client } from "../utils/client";

export const collectLetter = async () => {
  const result = await client
    .get(`/letters/collection`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const receiveLetter = async () => {
  const result = await client
    .get(`/letters/replies`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};
