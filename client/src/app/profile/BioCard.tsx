'use client';
import React from 'react';
import {Card, Input, Button, CardBody, CardHeader, Image, Divider, CardFooter, Link} from '@nextui-org/react';

export default function ProfileCard(): JSX.Element {
    return (
    <Card className="md:w-[750px] max-w-screen mx-4 my-2">
        <CardHeader className="flex flex-col gap-3 justify-center">
        </CardHeader>
        <Divider/>

        <CardBody>
            <p className='my-2'>Guy forgot to add my bio here</p>
            <p className='my-2'>Guy forgot to add my bio here</p>
            <p className='my-2'>Guy forgot to add my bio here</p>
            <p className='my-2'>Guy forgot to add my bio here</p>
            <p className='my-2'>Guy forgot to add my bio here</p>
        </CardBody>
        <Divider/>

        <CardFooter>
            <div className='flex flex-col'>
            <Link
                isExternal
                showAnchorIcon
                href="/"
            > Works at Sudan
            </Link>
            <Link
                isExternal
                showAnchorIcon
                href="/"
            > Works at Sudan
            </Link>
            <Link
                isExternal
                showAnchorIcon
                href="/"
            > Works at Sudan
            </Link>
            <Link
                isExternal
                showAnchorIcon
                href="/"
            > Works at Sudan
            </Link>
            <Link
                isExternal
                showAnchorIcon
                href="/"
            > Works at Sudan
            </Link>
            </div>
        </CardFooter>
    </Card>
    )
}