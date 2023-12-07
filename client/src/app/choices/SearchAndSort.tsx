'use client';
import React from 'react';
import {Button, Checkbox, Slider} from '@nextui-org/react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import Link from 'next/link';
import CustomCards from '@/components/Cards/CustomCards';

import Handler from './handler'
interface IQueryProps {
    location: boolean,
    preference: boolean,
    age: number[]
}
export default function SearchAndSort(): JSX.Element {
    // modal state management and handler data setup
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [dataset, setDataset] = React.useState<IQueryProps[]>([]);

    // for custom search modal
    const [isLocation, setIsLocation] = React.useState<boolean>(false);
    // const [ageRange, setAgeRange] = React.useState<number[]>([0,0]);
    const [isPreference, setIsPreference] = React.useState<boolean>(false);

    // for button callback style changes
    const [locationbutton, setLocationButton] = React.useState<string>('bg-blue-500 p-2 text-white rounded-lg m-2 hover:bg-blue-700 duration-300');
    const [preferencebutton, setPreferenceButton] = React.useState<string>('bg-blue-500 p-2 text-white rounded-lg m-2 hover:bg-blue-700 duration-300');
    const [agebutton, setAgeButton] = React.useState<string>('bg-blue-500 p-2 text-white rounded-lg m-2 hover:bg-blue-700 duration-300');

    // for search and sort state management
    const searchLocation = React.useRef<boolean>(false);
    const searchPreference = React.useRef<boolean>(false);
    const searchAge = React.useRef<number[]>([18,99]);

    // main function for handling button clicks: server side component calls
    const HandleClickFunc = async (item: string): void => {
        switch (item) {
            case 'location':
                searchLocation.current = !searchLocation.current;
                setLocationButton(
                    searchLocation.current ? 'bg-blue-700 p-2 text-white rounded-lg m-2 hover:bg-blue-700 duration-300' :
                        'bg-blue-500 p-2 text-white rounded-lg m-2 hover:bg-blue-700 duration-300'
                )
                break;
            case 'preference':
                searchPreference.current = !searchPreference.current;
                setPreferenceButton(
                    searchPreference.current ? 'bg-blue-700 p-2 text-white rounded-lg m-2 hover:bg-blue-700 duration-300' :
                        'bg-blue-500 p-2 text-white rounded-lg m-2 hover:bg-blue-700 duration-300'
                )
                break;
            case 'age':
                searchAge.current = [21,27]
                setAgeButton(
                    searchAge.current ? 'bg-blue-700 p-2 text-white rounded-lg m-2 hover:bg-blue-700 duration-300' :
                        'bg-blue-500 p-2 text-white rounded-lg m-2 hover:bg-blue-700 duration-300'
                )
                break;
        }
        try{
            const responsiveData = await Handler({
                location: searchLocation.current,
                preference: searchPreference.current,
                age: searchAge.current
            })
            setDataset(responsiveData)
            console.log(responsiveData)
        }
        catch(err){
            console.log(err)
        }

    }
    // const InActiveButtonClassName = 'bg-blue-500 p-2 text-white rounded-lg m-2 hover:bg-blue-700 duration-300';
    // const ActiveButtonClassName = 'bg-blue-700 p-2 text-white rounded-lg m-2 hover:bg-blue-700 duration-300';
    return(
        <div className='flex flex-col'>
            <div>
                <Button onPress={() => HandleClickFunc('location')} className={locationbutton}>Location</Button>
                <Button onPress={() => HandleClickFunc('preference')} className={preferencebutton}>Preference</Button>
                <Button onPress={() => HandleClickFunc('age')} className={agebutton}>Age</Button>
                <Button onPress={onOpen} className='bg-blue-500 p-2 text-white rounded-lg m-2 hover:bg-blue-700 duration-300'>Custom</Button>
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
            <div class="grid grid-cols-4 gap-4 mx-auto">
                {
                    dataset.map((item, index) => (
                        <Link href={`profiles?id=${item.serial}`} key={index}>
                            <CustomCards data={
                                {
                                    title: item.name,
                                    img: item.profileImage,
                                    age: item.age
                                }
                            }/>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
