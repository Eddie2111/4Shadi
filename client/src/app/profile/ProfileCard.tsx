'use client';
import React from 'react';
import {Card, CardBody, CardHeader, Image, Divider, CardFooter, Link} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
interface IDataProps{
    data: {
        name:string;
        email:string;
        age:string;
        height:string;
        preferences:string;
        gender:string;
        lookingFor:string;
        profileImage:string;
    }
}

export default function ProfileCard({data}:IDataProps): JSX.Element {
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const settingData = {
            name: 'name',
            email: 'meila',
            phone: '0170235486',
            amount: 450,
        }
        console.log(settingData)
        const tokenn = process.env.NEXT_PUBLIC_PAYMENTAPI || " ";
        await axios.post<string>(tokenn, settingData)
        .then(data=>{
            router.push(data.data)
        })
        .catch(err=>console.log(err))
      };
    return (
    <Card className="md:max-w-[450px] max-w-screen my-2 h-[450px]">
        <CardHeader className="flex flex-col gap-3 justify-center">
            <Image
            alt="nextui logo"
            height={120}
            radius="sm"
            src={data.profileImage}
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
        <button 
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-2'
        onClick={handleSubmit}
        >Get Premium</button>
    </Card>
    )
}