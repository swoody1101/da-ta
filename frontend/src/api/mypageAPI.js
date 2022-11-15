/**
 * @author boyeon
 */
import { client } from "../utils/client";

/**
 * @description
 */
export const collectLetterList = async () => {
  const result = await client
    .get(`/letters/collection`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const receiveLetterList = async () => {
  const result = await client
    .get(`/letters/replies`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const collectDeleteLetter = async (letter_id) => {
  const result = await client
    .delete(`/letters/collection/${letter_id}`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const replyDeleteLetter = async (letter_id) => {
  const result = await client
    .delete(`/letters/replies/${letter_id}`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const reportLetter = async (letter_id, body) => {
  const result = await client
    .post(`/letters/accusation/${letter_id}`, body)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const userInfo = async () => {
  const result = await client
    .get("/user")
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const setUserAge = async (body) => {
  const result = await client
    .put("/user/update/1", body)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const setUserAlert = async (body) => {
  const result = await client
    .put("/user/update/2", body)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const cancellation = async () => {
  const result = await client
    .delete("/user")
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const collectDetail = async (letterId) => {
  const result = await client
    .get(`/letters/collection/detail/${letterId}`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const replyDetail = async (letterId) => {
  const result = await client
    .get(`/letters/replies/detail/${letterId}`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

export const replyCheck = async () => {
  const result = await client
    .get(`letters/replies/check`)
    .then((response) => response)
    .catch((error) => error);
  return result;
};
