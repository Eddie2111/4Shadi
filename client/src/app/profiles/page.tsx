// profiles/header.tsx
// shows other people profiles here
'use client'
import type {IUserProps} from '@/types/UserTypes';
import {useSearchParams} from 'next/navigation';
import axios from 'axios';
import React from 'react';
import {Image} from '@nextui-org/react';
import CustomCards from '@/components/Cards/CustomCard';

export default function Profiles(): JSX.Element {
    const params = useSearchParams() as URLSearchParams;
    const [userdata, setUserdata] = React.useState<IUserProps>({});
    const paramID = params.get('id') || " ";
    React.useEffect(()=>{
        axios.post<IUserProps>(
            'http://localhost:3500/profile/getone',
            {'id': paramID.toString() || " "}
        )
        .then((res:any)=>{
            setUserdata(res.data.user);
            console.log(res.data.user);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[paramID])
    // console.log({'id': params.get('id').toString()})
    return(
        <center>
            <div className='w-[300px] md:w-[48rem] max-h-screen '>
                <div className='flex flex-col px-[100px]'>
                    <center>
                        <Image src={userdata.profileImage} width='300px' height='300px' alt='User Profile Image' className='my-5'/>
                    </center>
                    <div>
                        <h1 className='text-3xl'>{userdata?.name || 'Null data'}</h1>
                        <h2 className='text-xl'>{userdata?.email || 'Null data'}</h2>
                        <h3 className='text-xl'>{userdata?.phone_number || 'Null data'}</h3>
                    </div>
                    <CustomCards>
                        <div className='text-left'>
                            <h2 className='text-md'>Age: {userdata?.age || 'Null data'}</h2>
                            <h3 className='text-md'>Height: {userdata?.height || 'Null data'}</h3>
                            <h2 className='text-md'>Location: {userdata?.location || 'Null data'}</h2>
                        </div>
                    </CustomCards>
                </div>
            </div>
        </center>
    )
}
