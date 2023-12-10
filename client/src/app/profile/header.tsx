'use client';
import type {IUserProps} from '@/types/UserTypes';

import dynamic from 'next/dynamic';
import React from 'react';
import axios from 'axios';

const ProfileCard = dynamic(() => import('./ProfileCard'), {ssr: false});
const BioCard = dynamic(() => import('./BioCard'), {ssr: false});


export default function Header(): JSX.Element {
    const [userdata, setUserdata] = React.useState<IUserProps>({});
    const [profileCardData,setProfileCardData] = React.useState<any>({});
    const [biocardData,setBiocardData] = React.useState<any>({});
    React.useEffect(()=>{
        axios.get<any>(
            'http://localhost:3500/profile/getone',
            {withCredentials: true}
            )
        .then((res)=>{
            setProfileCardData({
                name: res?.data?.user?.name || " ", age: res?.data?.user?.age || " ",
                height: res?.data?.user?.height || " ", email: res?.data?.user?.email || " ",
                preferences: res?.data?.user?.preferences || " ", profileImage: res?.data?.user?.profileImage || " ",
                gender: res?.data?.user?.gender || " ", lookingFor: res?.data?.user?.lookingFor || " ",
            });
            
            setBiocardData({
                nid_number: res?.data?.user?.nid_number || " ",
                birth_cert: res?.data?.user?.birth_cert || " ",
                marriage_cert: res?.data?.user?.marriage_cert || " ",
                phone_number: res?.data?.user?.phone_number || " ",
                email: res?.data?.user?.email || " ", images: res?.data?.user?.images || [],
                location: res?.data?.user?.location || " ",
            });
        })
        .catch((err:any)=>{
            console.log(err);
        })
    },[])
    return(
        <div className='w-[95%] md:w-[70%] mx-5 md:mx-[18%] px-5 flex flex-col md:flex-row'>
            <ProfileCard data={profileCardData}/>
            <BioCard data={biocardData}/>
        </div>
    )
}
