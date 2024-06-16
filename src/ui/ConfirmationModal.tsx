import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  ModalBodyProps,
} from "@chakra-ui/react";

export type ConfirmationModalProps = ModalBodyProps & {
  onConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};
export const ConfirmationModal = ({
  onConfirm,
  isOpen,
  onClose,
  children = "Please confirm your action",
  title = "Confirmation",
}: ConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <HStack>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleConfirm}>
              Confirm
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
