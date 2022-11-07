import Modal from "./Modal";
import ReportModalContent from "../atoms/ReportModalContent";
import { useRecoilState } from "recoil";
import { reportModalState } from "../../recoil/Atoms";

const ReportModal = () => {
  const [modalToggle, setModalToggle] = useRecoilState(reportModalState);
  return (
    <Modal modalToggle={modalToggle} setModalToggle={setModalToggle}>
      <ReportModalContent />
    </Modal>
  );
};

export default ReportModal;
