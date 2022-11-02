/**
 * @author boyeon
 */
/**
 * @param start 시작 hex값
 */
const MypagePngs = ({ ...props }) => (
  <img
    src={process.env.PUBLIC_URL + `assets/images/mypage/${props.name}.png`}
    height={props.height ? props.height : null}
    width={props.width ? props.width : null}
  ></img>
);

export default MypagePngs;
