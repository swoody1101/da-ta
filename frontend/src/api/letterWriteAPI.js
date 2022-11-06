/**
 * @author mingyu
 */
import { client } from "../utils/client";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/Atoms";

/**
 * @description 텍스트 편지 쓰기
 */
export const saveTextLetter = async (options, userId) => {
	const result = await client
		.post(`/letters/1`, {
			userId: userId,
			option: {
				replyOption: options.allowReply,
				ageOption: options.age,
			},
			textLetterInfo: {
				title: "",
				content: "",
				backgroundUrl: "",
				fontName: "",
			},
		})
		.then((response) => response)
		.catch((error) => error);
	return result;
};

/**
 * @description 그림 편지 쓰기
 */
export const saveCanvasLetter = async (options, imageLetterUrl, userId) => {
	const result = await client
		.post(`/letters/2`, {
			userId: userId,
			option: {
				replyOption: options.allowReply,
				ageOption: options.age,
			},
			imageLetterInfo: {
				title: "도화지 편지",
				imageLetterUrl: imageLetterUrl,
				backgroundUrl: options.paper,
			},
		})
		.then((response) => response)
		.catch((error) => error);
	return result;
};
