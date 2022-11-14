/**
 * @author mingyu
 * @description 관리자 페이지 관련 api
 */
import { client } from "./../utils/client";
import { RoleTypes } from "./../constants/Roles";

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
export const accuseUser = async (letterAccusationId, listType) => {
  const result = await client
    .post(`/admin/accusation/${listType}/${letterAccusationId}`)
    .then((res) => res)
    .catch((error) => error.response);
  return result;
};

/**
 * @description 사용자 목록 조회
 */
export const getUserList = async () => {
  const result = await client
    .get(`/admin`)
    .then((res) => res)
    .catch((error) => error.response);
  return result;
};

/**
 * @description 사용자 권한 부여/제거
 */
export const putPermission = async (userId, role) => {
  const result = await client
    .put(`/admin/${userId}`, {
      role:
        role === RoleTypes.ROLE_ADMIN
          ? RoleTypes.ROLE_USER
          : RoleTypes.ROLE_ADMIN,
    })
    .then((res) => res)
    .catch((error) => error.response);
  return result;
};

/**
 * @description 오늘의 질문 목록 조회
 * @param {string} 질문 날짜 (YYYY-MM-DD)
 */
export const getQuestionList = async (date) => {
  const result = await client
    .get(`/admin/question?date=${date}`)
    .then((res) => res)
    .catch((error) => error.response);
  return result;
};

/**
 * @description 오늘의 질문 조회
 * @param {number} 질문 번호
 */
export const getQuestion = async (questionId) => {
  const result = await client
    .get(`/admin/question/${questionId}`)
    .then((res) => res)
    .catch((error) => error.response);
  return result;
};

/**
 * @description 오늘의 질문 등록
 * @param {string} question 질문 내용
 * @param {string} date 날짜 (YYYY-MM-DD)
 */
export const saveQuestion = async (question, date) => {
  const result = await client
    .post(`/admin/question`, {
      question: question,
      date: date,
    })
    .then((res) => res)
    .catch((error) => error.response);
  return result;
};

/**
 * @description 오늘의 질문 수정
 * @param {number} questionId 질문 번호
 * @param {string} question 질문 내용
 */
export const modifyQuestion = async (questionId, question) => {
  const result = await client
    .put(`/admin/question/${questionId}`, {
      question: question,
    })
    .then((res) => res)
    .catch((error) => error.response);
  return result;
};

/**
 * @description 오늘의 질문 삭제
 * @param {number} questionId 질문 번호
 */
export const deleteQuestion = async (questionId) => {
  const result = await client
    .delete(`/admin/question/${questionId}`)
    .then((res) => res)
    .catch((error) => error.response);
  return result;
};

/**
 * @description 오늘의 답변 목록 조회
 * @param {number} questionId 해당 오늘의 질문 번호
 */
export const getAnswerList = async (questionId) => {
  const result = await client
    .get(`/admin/answer/${questionId}`)
    .then((res) => res)
    .catch((error) => error.response);
  return result;
};
