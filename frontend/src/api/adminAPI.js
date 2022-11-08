/**
 * @author mingyu
 * @description 관리자 페이지 관련 api
 */
import { client } from "./../utils/client";

/**
 * @description 유저 신고 처리
 */
export const accuseUser = async (userId) => {
	const response = await client
		.post(`/admin/accusation/${userId}`)
		.then((res) => res)
		.catch((error) => error.response);

	return response;
};
