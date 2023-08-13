import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import React from "react";
import Image from "next/image";

type ModalProps = {
  imageUrl: string;
  onOpenChange: () => void;
  isOpen: boolean;
};

function ImageModal({ isOpen, onOpenChange, imageUrl }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <Image src={imageUrl} width={400} height={400} alt="image" />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ImageModal;
