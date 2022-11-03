/**
 * @author mingyu
 */

/**
 * @description 편지 입력시 과한 재렌더링을 막기 위한 디바운싱 함수
 * @param {() => void} callback 콜백함수
 * @param {number} delay 딜레이
 */
let timer; // debounce에 사용되는 timer
export const debounce = (callback, delay) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(callback, delay);
};
