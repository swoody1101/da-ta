import Modal from "./Modal";
import ReportModalContent from "../atoms/ReportModalContent";
import { useRecoilState } from "recoil";
import { reportState } from "../../recoil/Atoms";

const ReportModal = () => {
  const [modalToggle, setModalToggle] = useRecoilState(reportState);
  return (
    <Modal
      titleText={"편지 신고하기"}
      modalToggle={modalToggle}
      setModalToggle={setModalToggle}
    >
      <ReportModalContent />
    </Modal>
  );
};

export default ReportModal;
