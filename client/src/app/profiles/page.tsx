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
    const [sentStatus, setSentStatus] = React.useState<string>('');
    const paramID = params.get('id') || " ";
    const HitMatches = () => {
        axios.post(
            'http://localhost:4100/matches',
            {
                userID: localStorage.getItem('id') || " ",
                sent: paramID.toString() || " ",
                received: localStorage.getItem('id') || " "
            },
        )
        .then((res:any)=>{
            setSentStatus('sent');
            console.log(res.data,'is');
        })
        .catch((err)=>{
            setSentStatus('Already sent');
            console.log(err,'is');
        })
    }
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
    console.log({'id': params.get('id').toString()})
    return(
        <center>
            <div className='w-[300px] md:w-[48rem] max-h-screen '>
                <div className='flex flex-col px-[100px]'>
                    <center>
                        <Image src={userdata.profileImage} width='300px' height='300px' alt='User Profile Image' className='my-5'/>
                    </center>
                    <div>
                        <h1 className='text-3xl'>{userdata?.name || ' '}</h1>
                        <h2 className='text-xl'>{userdata?.email || ' '}</h2>
                        <h3 className='text-xl'>Likes: {userdata?.preferences || ' '}</h3>
                    </div>
                    <center>
                    <button 
                    onClick={
                        () => {
                            axios.post(
                                'http://localhost:4200/matches',
                                {
                                    userID: localStorage.getItem('id') || " ",
                                    sent: params.get('id').toString() || " ",
                                    received: localStorage.getItem('id') || " "
                                },
                            )
                            .then((res:any)=>{
                                console.log(res.data);
                                setSentStatus('sent');
                            })
                            .catch((err)=>{
                                console.log(err);
                            })
                        }
                    }
                    className='w-32 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-auto rounded my-5 duration-300'>
                        Interested
                    </button>
                    <p className='text-white'>{sentStatus}</p>
                    </center>
                    <CustomCards>
                        <div className='text-left'>
                            <h2 className='text-md'>Age: {userdata?.age || ' '}</h2>
                            <h3 className='text-md'>Height: {userdata?.height || ' '}</h3>
                            <h2 className='text-md'>Location: {userdata?.location || ' '}</h2>
                        </div>
                    </CustomCards>
                </div>
            </div>
        </center>
    )
}
