/**
 * @author mingyu
 */
import { client } from "../utils/client";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/Atoms";
import { LetterOptions } from "./../constants/Options";

/**
 * @description 텍스트 편지 쓰기
 */
export const saveTextLetter = async (options, title, content) => {
  const body = {
    option: {
      replyOption: options.allowReply,
      ageOption: LetterOptions.AGES_VALUE[options.age],
    },
    textLetterInfo: {
      title: title,
      content: content,
      backgroundId: LetterOptions.PAPERS.indexOf(options.paper),
      fontId: LetterOptions.FONTS.indexOf(options.font),
    },
  };

  console.log(body);

  const result = await client
    .post(`/letters/1`, body)
    .then((response) => response)
    .catch((error) => error);
  return result;
};

/**
 * @description 그림 편지 쓰기
 */
export const saveCanvasLetter = async (options, imageLetterUrl) => {
  const body = {
    option: {
      replyOption: options.allowReply,
      ageOption: LetterOptions.AGES_VALUE[options.age],
    },
    imageLetterInfo: {
      title: "도화지 편지",
      imageLetterUrl: imageLetterUrl,
      backgroundId: LetterOptions.PAPERS.indexOf(options.paper),
    },
  };

  const result = await client
    .post(`/letters/2`, body)
    .then((response) => response)
    .catch((error) => error);
  return result;
};
