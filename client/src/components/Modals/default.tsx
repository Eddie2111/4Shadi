'use client';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import React from "react";

interface ModalProps {
    ButtonName: string;
    Title: string;
    Description: string;
}

const DefaultModal = ({ButtonName, Title, Description}: ModalProps): JSX.Element => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return(
        <>
        <Button onPress={onOpen}>{ButtonName}</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{Title}</ModalHeader>
                <ModalBody>
                  {Description}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
}

export default DefaultModal;