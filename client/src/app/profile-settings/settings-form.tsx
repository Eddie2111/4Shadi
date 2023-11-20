'use client';
import axios from "axios";
import React from "react";

import { useRouter } from "next/router";
import { Card, Input, Button } from "@nextui-org/react";
import {motion} from 'framer-motion';

export default function SettingsForm() {
    const [preference, setPreferences] = React.useState<string>("");
    const preferences:string[] = ["gardening", "driving", "travelling", "playing games", "atheletics", "gym"];
    const [selectedPreferences, SetSelectedPreferences] = React.useState<string[]>([]);
    async function SettingSelectedPreferences(e: React.ChangeEvent<HTMLSelectElement>){
        e.preventDefault();
        const stringConverter: string = e.currentTarget.value;
        if (!selectedPreferences.includes(stringConverter) && stringConverter !== "0") {
            SetSelectedPreferences([...selectedPreferences, stringConverter]);
        }
        if (selectedPreferences.includes(stringConverter) && stringConverter !== "0") {
            SetSelectedPreferences(selectedPreferences.filter((item) => item !== stringConverter));
        }
    }
    return(
        <div className='container w-[95%] mx-auto px-auto mt-5'>
            <div className='flex flex-col md:flex-row'>
                <Card className='w-72 p-2'>
                    has certificates
                </Card>
                <Card className='w-[80%] p-2 m-2'>
                    <div className='flex flex-col'>
                        Has where works
                        <div className='flex flex-row my-2'>
                        {
                            selectedPreferences.length>0 ?
                            selectedPreferences.map((item, index) => {
                                return(
                                    <div className='flex flex-row justify-between' key={index}>
                                        <Badge title={item} />
                                    </div>
                                )
                            })
                            :
                            <p className='text-red-500'>No preferences selected</p>
                            }
                        </div>
                        <select name="preferences" id="" 
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => SettingSelectedPreferences(e)} 
                            className='w-64 text-md text-gray-700 rounded-lg p-2'>
                            <option value="0" className='text-md text-gray-700'>Select</option>
                            { preferences.map((item,index)=>{
                                return(
                                    <option key={index} value={item} className='text-md text-gray-700'>{item}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                </Card>
            </div>

        </div>
    )
}

function Badge({title}:any):JSX.Element{
    return(
        <motion.div
        initial={{scale:0}}
        animate={{scale:1}}
        transition={{duration:0.1}}
        className='rounded-xl bg-blue-500 block mx-2 px-2 text-white shadow-xl hover:bg-blue-400 duration-300'>
            {title}
        </motion.div>
    )
}