/**
 * @author mingyu
 * @description firebase storage 사용 관련 함수들을 모아놓은 파일입니다.
 */

import { firebaseStorage } from "../firebase-config";
import { ref, getDownloadURL } from "firebase/storage";

const storage = firebaseStorage;

/** dataURL을 File 객체로 변환해주는 함수 */
const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

/** firebase storage에 canvas 이미지 업로드
 * @param imageDataUrl url 형식의 이미지
 * @param path firebase storage에 저장할 이미지 경로
 * @return firebase storage에 저장된 경로 풀네임
 */
export const uploadFirebaseStorage = (imageDataUrl, path) => {
  const filePath = path ? path : "drawings/";
  const filename = new Date().valueOf();

  const storageRef = storage.ref();
  const storePath = storageRef.child(`${filePath}${filename}.png`); // firebase storage 내 저장할 경로
  const imageFile = dataURLtoFile(imageDataUrl, "canvas_image.png");

  storePath
    .put(imageFile)
    .then((result) => {
      result;
    })
    .catch((error) => error);

  return `${filePath}${filename}`;
};

/** firebase storage에 저장된 이미지 불러오기
 * @param {string} path 파일이름 이전까지의 firebase storage 경로 (예시 -> drawings/1216162.png)
 */
export const downloadFirebaseStorage = async (path) => {
  const result = await getDownloadURL(ref(storage, `${path}`))
    .then((url) => url)
    .catch((error) => error);
  return result;
};
