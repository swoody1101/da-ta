import React from "react";
import Modal from "./Modal";
import ReportAnswerModalContent from "./../atoms/landing/ReportAnswerModalContent";

const ReportAnswerModal = ({ modalToggle, setModalToggle, answerId }) => {
  return (
    <Modal
      modalToggle={modalToggle}
      setModalToggle={setModalToggle}
      height="auto"
      maxWidth="535px"
    >
      <ReportAnswerModalContent
        setModalToggle={setModalToggle}
        answerId={answerId}
      />
    </Modal>
  );
};

export default ReportAnswerModal;
