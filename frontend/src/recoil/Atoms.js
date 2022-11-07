/**
 * @author mingyu
 */
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

/**
 * @desciption 로그인 여부
 * @return {boolean} true or false를 반환함
 * @example true false
 */
export const loginState = atom({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

/**
 * @description 사용자 정보
 */
export const userState = atom({
  key: "userState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

/**
 * @description 마이페이지의 현재 nested router 위치
 * @return {number} 0~2
 */
export const mypageRouterState = atom({
  key: "mypageRouterState",
  default: 0,
});

/**
 * @description 로딩스피너
 */
export const loadingState = atom({
  key: "loading",
  default: false,
});

/**
 * @description 편지 신고하기 모달 toggle
 * @return {boolean}
 */
export const reportModalState = atom({
  key: "reportModalState",
  default: false,
});

/**
 * @description 신고된 편지 id
 * @return {number}
 */
export const reportLetterIdState = atom({
  key: "reportLetterIdState",
  default: null,
});
