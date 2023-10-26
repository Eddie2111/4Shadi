'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import axios from 'axios';

const ProfileCard = dynamic(() => import('./ProfileCard'), {ssr: false});
const BioCard = dynamic(() => import('./BioCard'), {ssr: false});


export default function Header(): JSX.Element {
    const [userdata, setUserdata] = React.useState<IUserProps>({});
    const [profileCardData,setProfileCardData] = React.useState({});
    const [biocardData,setBiocardData] = React.useState({});
    React.useEffect(()=>{
        axios.get<IUserProps>(
            'http://localhost:3500/profile/getone',
            {withCredentials: true}
            )
        .then((res)=>{
            // console.log(res.data);
            setProfileCardData({
                name: res.data.user.name, age: res.data.user.age,
                height: res.data.user.height, email: res.data.user.email,
                preferences: res.data.user.preferences,
            });
            setBiocardData({
                nid_number: res.data.user.nid_number,
                birth_cert: res.data.user.birth_cert,
                marriage_cert: res.data.user.marriage_cert,
                phone_number: res.data.user.phone_number,
                email: res.data.user.email,
                location: res.data.user.location,
            });
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    return(
        <div className='w-[99%] md:w-[95%] p-5 md:px-20 flex flex-col md:flex-row'>
            <ProfileCard data={profileCardData}/>
            <BioCard data={biocardData}/>
        </div>
    )
}


interface IUserProps{
    data?: {
        user?: {
            _id: string;
            age: string
            birth_cert: string
            email: string;
            height: string;
            location: string;
            marriage_cert: string;
            name: string;
            nid_number: string;
            phone_number: string
            preferences: string;
            serial: string;
        }
    },
    user?: {
        _id: string;
        age: string
        birth_cert: string
        email: string;
        height: string;
        location: string;
        marriage_cert: string;
        name: string;
        nid_number: string;
        phone_number: string
        preferences: string;
        serial: string;
    }
}