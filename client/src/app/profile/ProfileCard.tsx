'use client';
import React from 'react';
import {Card, CardBody, CardHeader, Image, Divider, CardFooter, Link} from '@nextui-org/react';

interface IDataProps{
    data: {
        name:string;
        email:string;
        age:string;
        height:string;
        preferences:string;
        gender:string;
        lookingFor:string;
    }
}

export default function ProfileCard({data}:IDataProps): JSX.Element {
    return (
    <Card className="md:max-w-[450px] max-w-screen my-2 h-[380px]">
        <CardHeader className="flex flex-col gap-3 justify-center">
            <Image
            alt="nextui logo"
            height={120}
            radius="sm"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS28_XoPPQzqxyJvpLIAcXAp-WcXwsSkuluaA&usqp=CAU"
            width={120}
            />
            <div className="flex flex-col justify-center text-center">
                <p className="text-md">{data.name}</p>
            </div>
        </CardHeader>
        <Divider/>

        <CardBody>
            <p>Gender {data.gender} </p>
            <p>Age: {data.age}</p>
            <p>Height: {data.height}</p>
            <p>Preferences: {data.preferences}</p>
            <p>Looking for: {data.lookingFor}</p>

        </CardBody>
        <Divider/>

        <CardFooter className='text-center'>
            <Link
            isExternal
            showAnchorIcon
            className="w-[320px] text-center"
            href="https://github.com/nextui-org/nextui"
            > {data.email}
            </Link>
        </CardFooter>
    </Card>
    )
}