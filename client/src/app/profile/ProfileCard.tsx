'use client';
import React from 'react';
import {Card, Input, Button, CardBody, CardHeader, Image, Divider, CardFooter, Link} from '@nextui-org/react';

export default function ProfileCard(): JSX.Element {
    return (
    <Card className="md:max-w-[450px] max-w-screen my-2 h-[360px]">
        <CardHeader className="flex flex-col gap-3 justify-center">
            <Image
            alt="nextui logo"
            height={120}
            radius="sm"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS28_XoPPQzqxyJvpLIAcXAp-WcXwsSkuluaA&usqp=CAU"
            width={120}
            />
            <div className="flex flex-col justify-center text-center">
                <p className="text-md">Dante</p>
                <p className="text-small text-default-500"><span className='font-bold'>@</span>NariProttashi_69</p>
            </div>
        </CardHeader>
        <Divider/>

        <CardBody>
            <p>Guy forgot to add my bio here</p>
        </CardBody>
        <Divider/>

        <CardFooter>
            <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
            > I only use Pager so I have no social media links
            </Link>
        </CardFooter>
    </Card>
    )
}