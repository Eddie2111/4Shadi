'use client';
import React from "react";
import Axios from "axios";
import { Spinner } from "@nextui-org/react";
import {useRouter} from "next/navigation";

export default function Logout() : JSX.Element {
    const router = useRouter();
    React.useEffect(()=>{
        Axios.get('http://localhost:3400/logout', {withCredentials: true});
        localStorage.removeItem('token');
        router.push('/');
    },[router])
    return(
        <div className='flex justify-center items-center h-screen text-6xl'>
            <Spinner size='large'/>
        </div>
    )
}
