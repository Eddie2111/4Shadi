import axios from "axios";
import { cookies } from 'next/headers'
import Link from 'next/link';
import CustomCards from '@/components/Cards/CustomCards';

async function ServerHandle(){
    'use server';
    const cookieStore = cookies()
    const token = cookieStore.get('user_token');
    const response = await axios.post("http://localhost:4200/getMatches",{token}, { withCredentials: true})
    const requestedprofiles = response.data.data.received;
    return requestedprofiles
}
async function GetProfiles(id:string){
    const response = await axios.post("http://localhost:3500/profile/getone",{id}, { withCredentials: true})
    return response.data;
}


export default async function Page():JSX.Element{
    const responsion = await ServerHandle();
    // pass each of the elements of responsion into getprofiles and store them 
    const profiles = await Promise.all(responsion.map(async (item:string) => {
        const profile = await GetProfiles(item);
        return profile;
    }))
    //console.log(profiles)
    return(
        <div className='container mx-auto px-auto my-10'
        >
            <h1>Recieved Requests</h1>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                {profiles.map((item:any) => {
                    //console.log(item)
                    return(
                        <Link href={`/profiles?id=${item.user.serial}`} key={item.user.serial}>
                                <CustomCards
                                    data={item.user}
                                />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}