'use client';
import axios from 'axios';
import {Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Spinner, useDisclosure} from "@nextui-org/react";
import React from "react";

interface ModalProps {
    id: string;
    ButtonName: string;
    Title: string;
}

const DefaultModal = ({ButtonName, Title, id}: ModalProps): JSX.Element => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [recID, setRecID] = React.useState('0');
    const [contentTitle, setContentTitle] = React.useState<string>('');
    const [contentDesc, setContentDesc] = React.useState<string>('');
    const buttonName = ButtonName || 'Delete';
    const title = Title || 'Delete Blog';
    const ID = id || '0';

    const OnSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formdata = new FormData(e.currentTarget);
      const title = formdata.get('title') || contentTitle;
      const content = formdata.get('content') || contentDesc;
      console.log(id,title,content)
      try{
        const res = await axios.post(`http://localhost:3700/blog/update?id=${id}`, {id:id, title: title, content: content});
        console.log(res.data);
        // onOpenChange();
        // reload the page
        if(res.data.message === 'blog updated successfully') {
           window.location.reload();
        }
      }
      catch(err){
        console.log(err);
      }

    }
    const OnClickFunction = async () => {
      try{
        const res = await axios.post(`http://localhost:3700/blog/update?id=${id}`, {id: ID});
        console.log(res.data);
        // onOpenChange();
        // reload the page
        // window.location.reload();
      }
      catch(err){
        console.log(err);
      }
    }
    React.useEffect(()=>{
      async function GetData(){
        if (!isOpen) {return null}
        if (isOpen) {
          const res = await axios.get(`http://localhost:3700/get_one?id=${id}`);
          const data = await res.data;
          console.log(data);
          setRecID(data[0]);
          setContentTitle(data[1]);
          setContentDesc(data[2]);
        }
      }
      GetData();
    },[id, isOpen]);
    return(
        <>
        <Button className='border-2 bg-transparent mx-2 border-green-500 hover:bg-blue-500 hover:text-black duration-300' onPress={onOpen}>{ButtonName}</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{Title}</ModalHeader>
              <ModalBody>
                {recID === '0' ? (
                  <div className='my-20 py-10 h-[12rem]'>
                    <Spinner />
                  </div>
                ) : (
                  <form onSubmit={OnSubmitHandle}>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='title'>Title</label>
                      <input type='text' name='title' id='title' defaultValue={contentTitle} className='border-2 border-gray-500 rounded-md p-2' />
                      <label htmlFor='content'>Content</label>
                      <textarea name='content' id='content' defaultValue={contentDesc} className='border-2 border-gray-500 rounded-md p-2' cols={30} rows={10}></textarea>  
                    </div>
                    <div className='flex flex-row justify-end gap-2 my-5'>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" type='submit'>
                        Confirm
                      </Button>
                    </div>
                  </form>
                )}
              </ModalBody>
            </>
          )}
          </ModalContent>
        </Modal>
      </>
    );
}

export default DefaultModal;