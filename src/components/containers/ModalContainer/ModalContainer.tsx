import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { modalPropType } from "@app/types";

const ModalContainer = ({
  isOpen,
  setIsopen,
  title = "",
  children,
  className,
  styles,
}: modalPropType) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        scrollable={true}
        centered={true}
        toggle={() => setIsopen(false)}
        className={`custom-modal ${className}`}
      >
        <ModalHeader toggle={() => setIsopen(false)}>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>       
      </Modal>
    </div>
  );
};

export default ModalContainer;
