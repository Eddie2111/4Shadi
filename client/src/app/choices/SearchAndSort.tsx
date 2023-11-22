'use client';
import React from 'react';
import {Button, Checkbox, Input, Slider} from '@nextui-org/react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

export default function SearchAndSort(): JSX.Element {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isLocation, setIsLocation] = React.useState<boolean>(false);
    const [ageRange, setAgeRange] = React.useState<number[]>([0,0]);
    const [isPreference, setIsPreference] = React.useState<boolean>(false);
    const category= [
        'location', 'preference', 'age', 'gender'
    ]
    const HandleClickFunc = (item: string): void => {
        console.log('clicked',item)
    }
    console.log(
        'ageRange', ageRange,
        'isLocation', isLocation
    )
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
                            className="max-w-md"
                            defaultValue={[24, 30]}
                            onChange={setAgeRange}
                            />
                        <Checkbox isSelected={isLocation} onValueChange={setIsLocation}>
                            Match Location
                        </Checkbox>
                        <Checkbox isSelected={isPreference} onValueChange={setIsPreference}>
                            Match Your Preferences
                        </Checkbox>

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
