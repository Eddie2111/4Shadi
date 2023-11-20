// profiles/header.tsx
'use client'
import type {IUserProps} from '@/types/UserTypes';
import {useSearchParams} from 'next/navigation';
import axios from 'axios';
import React from 'react';
import {Image} from '@nextui-org/react';
export default function Profiles(): JSX.Element {
    const params = useSearchParams();
    const [userdata, setUserdata] = React.useState<IUserProps>({});
    React.useEffect(()=>{
        axios.post<IUserProps>(
            'http://localhost:3500/profile/getone',
            {'id': params.get('id').toString()}
        )
        .then((res)=>{
            setUserdata(res.data.user);
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    console.log({'id': params.get('id').toString()})
    return(
        <div className='container mx-auto px-auto'>
            <div className='flex flex-row'>
                <div className='w-1/3'>
                    <Image src='https://nextui.org/images/card-example-3.jpeg' alt='avatar' className='rounded-full w-48 h-48'/>
                </div>
                <div className='w-2/3'>
                    <div className='flex flex-row'>
                        <div className='w-1/2'>
                            <h1 className='text-3xl'>{userdata?.username || 'Null data'}</h1>
                            <h2 className='text-xl'>{userdata?.email || 'Null data'}</h2>
                            <h3 className='text-xl'>{userdata?.phone_number || 'Null data'}</h3>
                        </div>
                        <div className='w-1/2'>
                            <h1 className='text-3xl'>{userdata?.name || 'Null data'}</h1>
                            <h2 className='text-xl'>{userdata?.age || 'Null data'}</h2>
                            <h3 className='text-xl'>{userdata?.patronymic || 'Null data'}</h3>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-1/2'>
                            <h1 className='text-3xl'>{userdata?.city || 'Null data'}</h1>
                            <h2 className='text-xl'>{userdata?.location || 'Null data'}</h2>
                        </div>
                        <div className='w-1/2'>
                            <h1 className='text-3xl'>{userdata?.birthday || 'Null data'}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}