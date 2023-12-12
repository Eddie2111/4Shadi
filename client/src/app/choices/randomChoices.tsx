import axios from 'axios';
import CustomCard from '@/components/Cards/CustomCards';
import { cookies } from 'next/headers'

async function ServerHandle(){
    'use server';
    const cookieStore = cookies()
    const token = cookieStore.get('user_token');
    const response = await axios.post("http://localhost:3200/random",{token}, { withCredentials: true})
    return response.data;
}
interface IitemProps {
    data: {
        title: string;
        img: string;
        age: string;
    };
}

export default async function RandomGen(){
    const data = await ServerHandle();
    const randomHead = Math.floor(Math.random() * (data.data.length+3)-1);
                                                    //max - min) + min);
    console.log(randomHead,randomHead+2);
    return(
        <>
        {

            data.data.slice(randomHead,randomHead+3).map((item: IitemProps, index:number) => {
                return(
                    <CustomCard data={item} key={index}/>
                )
            })
        }
        </>
    )
}