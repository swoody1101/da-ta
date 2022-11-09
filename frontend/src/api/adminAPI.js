/**
 * @author mingyu
 * @description 관리자 페이지 관련 api
 */
import { client } from "./../utils/client";

/**
 * @description 신고 목록 조회 [편지, 오늘의 답변]
 */
export const getReportList = async (listType) => {
  const result = await client
    .get(`/admin/accusation/${listType}`)
    .then((res) => res)
    .catch((error) => error.response);
  return result;
};

/**
 * @description 유저 신고 처리 [편지, 오늘의 답변]
 */
export const accuseUser = async (userId, listType) => {
  const result = await client
    .post(`/admin/accusation/${listType}/${userId}`)
    .then((res) => res)
    .catch((error) => error.response);
  return result;
};
