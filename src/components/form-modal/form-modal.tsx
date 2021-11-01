import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalFooter,
} from "@chakra-ui/react";

interface FormModalProps {
  onSave: (data: { [key: string]: any }) => void;
  isOpen: boolean;
  onClose: () => void;
  headerText: React.ReactNode | string;
  saveText: string;
  cancelText: string;
  disabled: boolean;
  loading: boolean;
  children: React.ReactNode | string;
}

const FormModal: React.FC<FormModalProps> = (props: FormModalProps) => {
  const {
    isOpen,
    onClose,
    headerText,
    saveText,
    cancelText,
    onSave,
    disabled,
    loading,
    children,
  } = props;

  const [modal, setModal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // HackFix to set opacity to 1
    if (modal) {
      modal.style.opacity = "1";
    }
  });

  const modalRef = useCallback(
    (node: HTMLElement) => {
      if (node !== null) {
        setModal(node);
      }
    },
    [setModal]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent ref={modalRef}>
        <ModalHeader>{headerText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{children}</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            type="submit"
            mr={3}
            onClick={onSave}
            disabled={disabled}
            isLoading={loading}
          >
            {saveText}
          </Button>
          <Button onClick={onClose}>{cancelText}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const MemoFormModal = React.memo(FormModal);
export { MemoFormModal as FormModal };
export default MemoFormModal;
