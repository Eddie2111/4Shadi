'use client';
import React from 'react';
import {Card, CardBody, CardHeader, Image, Divider, CardFooter} from '@nextui-org/react';

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
        <CardHeader className="flex flex-col gap-3 justify-center">
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
            <div class="grid grid-cols-4 grid-flow-row gap-4">
                {data.images.map((image, index)=>{
                    return <Image
                    key={index}
                    alt="nextui logo"
                    height={120}
                    radius="sm"
                    src={image}
                    width={120}
                    />
                })}
            </div>
        </CardFooter>
    </Card>
    )
}