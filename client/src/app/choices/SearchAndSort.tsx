'use client';
import React from 'react';
import {Button, Checkbox, Input, Slider} from '@nextui-org/react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

export default function SearchAndSort(): JSX.Element {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isLocation, setIsLocation] = React.useState(false);
    const category= [
        'location', 'preference', 'age', 'gender'
    ]
    const HandleClickFunc = (item: string): void => {
        console.log('clicked',item)
    }
    return(
        <div className='flex flex-col'>
            <div>{
                category.map((item, index) => {
                    return (
                        <Button onClick={()=>HandleClickFunc(item)} key={index} className='bg-blue-500 p-2 text-white rounded-lg m-2 hover:bg-blue-700 duration-300'>
                            {item}
                        </Button>
                    )
                })
            }
                <Button onPress={onOpen} className='bg-blue-500 p-2 text-white rounded-lg m-2 hover:bg-blue-700 duration-300'>Custom</Button>
            </div>
            <div>
                <Button color="success">Sort</Button>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Customize Search</ModalHeader>
                        <ModalBody>
                            <Slider 
                            label="Age"
                            step={1}
                            maxValue={99}
                            minValue={18}
                            defaultValue={24}
                            className="max-w-md"
                            />
                        <Checkbox isSelected={isLocation} onValueChange={setIsLocation}>
                            Match Location
                        </Checkbox>
                        <p>
                            Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                            dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                            Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                            Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                            proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                        </p>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                            Submit
                        </Button>
                        </ModalFooter>
                    </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}
