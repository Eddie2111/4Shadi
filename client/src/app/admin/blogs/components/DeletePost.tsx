'use client';
import axios from 'axios';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import React from "react";

interface ModalProps {
    id: string;
    ButtonName: string;
    Title: string;
    Description: string;
}

const DefaultModal = ({ButtonName, Title, Description, id}: ModalProps): JSX.Element => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const buttonName = ButtonName || 'Delete';
    const title = Title || 'Delete Blog';
    const description = Description || 'Are you sure to delete this Blog?';
    const ID = id || '0';
    const OnClickFunction = async () => {
      try{
        const res = await axios.get(`http://localhost:3700/blog/delete?id=${id}`, {id: ID});
        console.log(res.data);
        // onOpenChange();
        // reload the page
        window.location.reload();
      }
      catch(err){
        console.log(err);
      }
    }
    return(
        <>
        <Button className='border-2 bg-transparent mx-2 border-red-500 hover:bg-red-500 hover:text-black duration-300' onPress={onOpen}>{ButtonName}</Button>
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
                  <Button color="primary" onPress={OnClickFunction}>
                    Confirm
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