'use client';
import React from 'react';
import {Card, CardBody, CardHeader, Image, Divider, CardFooter, Link} from '@nextui-org/react';
import { CgProfile } from "react-icons/cg";
import { CiBellOn } from "react-icons/ci";
import { GoLaw } from "react-icons/go";
interface IDataProps {
    data: {
        nid_number: string;
        birth_cert: string;
        marriage_cert: string;
        phone_number: string;
        email: string;
        location: string;
        images: string[];
    }
}

export default function BioCard({data}:IDataProps): JSX.Element {
    return (
    <Card className="md:w-[750px] max-w-screen mx-4 my-2">
        <CardHeader className="flex flex-row gap-3 justify-center">
            <Link href='/profile/requests' className='text-5xl mx-auto hover:text-green-500 duration-300'>
                <CgProfile />
            </Link>
            <Link href='/profile/notifications' className='text-5xl mx-auto hover:text-green-500 duration-300'>
                <CiBellOn/>
            </Link>
            <Link href='/profile/lawsupport' className='text-5xl mx-auto hover:text-green-500 duration-300'>
                <GoLaw />
            </Link>
        </CardHeader>
        <Divider/>

        <CardBody>
            <p className='my-2'>NID Number: {data.nid_number}</p>
            <p className='my-2'>Birth Certificate: {data.birth_cert}</p>
            <p className='my-2'>Marriage Certificate: {data.marriage_cert}</p>
            <p className='my-2'>Location: {data.location}</p>
            <p className='my-2'>Phone Number: {data.phone_number}</p>
        </CardBody>
        <Divider/>

        <CardFooter>
            <div class="grid grid-cols-1 md:grid-cols-4 grid-flow-row gap-4">
            {
                data?.images?.map((image, index)=>{
                    return (
                        <Image
                            key={index}
                            src={image}
                            width={200}
                            height={200}
                            alt='image'
                            className='my-2'
                        />
                    )
                })
            }
            </div>
        </CardFooter>
    </Card>
    )
}