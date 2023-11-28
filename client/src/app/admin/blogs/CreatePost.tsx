'use client';
import axios from 'axios';

import { z } from "zod";
import {Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea, useDisclosure} from "@nextui-org/react";
import React from "react";

export default function CreatePost(): JSX.Element{
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const FormSchema = z.object({
        title: z.string().min(3).max(150),
        content: z.string().min(10).max(2048),
        author: z.string().min(3).max(50),
    })
    const SubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const title = data.get('title');
        const content = data.get('content');
        const author = data.get('author');
        try{
            const validData = FormSchema.parse({
                title: title,
                content: content,
                author: author
            })
            console.log(validData);
            const res = await axios.post('http://localhost:3700/', validData);
            console.log(res.data)
            onOpenChange();
        } catch(err) {
            console.log(err);
        }
    }
    return(
        <>
        <button className='block p-2 border-2 rounded-lg border-green-500 hover:bg-green-300 hover:text-black duration-300'
                onClick={onOpen}>Create a blog</button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Write a blog</ModalHeader>
                <ModalBody>
                    <form onSubmit={SubmitHandle}>
                        <Input className='my-4' isRequired label="Title" placeholder="Title" name='title'/>
                        <Textarea minRows={5} isRequired className='my-4' label="Content" placeholder="Content" name='content'/>
                        <Input className='my-4' isRequired label="Author" placeholder="Author" name='author'/>
                        <Button type='submit' className='my-2' color="primary"> Submit</Button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
        </>
    )
}
