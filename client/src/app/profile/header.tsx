'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const ProfileCard = dynamic(() => import('./ProfileCard'), {ssr: false});
const BioCard = dynamic(() => import('./BioCard'), {ssr: false});

export default function Header(): JSX.Element {
    return(
        <div className='w-[99%] md:w-[95%] p-5 md:px-20 flex flex-col md:flex-row'>
            <ProfileCard/>
            <BioCard/>
        </div>
    )
}