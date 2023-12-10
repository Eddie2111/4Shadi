import type {Metadata} from 'next';
export const metadata:Metadata = {
    title: "Support",
    description: "Let us know if you have any issues or need Law support",
}

import CustomCard from '@/components/Cards/CustomCard';

export default function Support():JSX.Element{
    return(
        <div className='container mx-48 px-48'>
            <h1 className='text-center'>Support</h1>
            <div className='flex flex-row justify-between'>
                <CustomCard>
                    <LawSupport/>
                </CustomCard>
                <CustomCard>
                    <TechnicalIssues/>
                </CustomCard>
            </div>
        </div>
    )
}

function LawSupport():JSX.Element{
    async function SubmitIssues(){
        "use server";
        const data = new FormData();
        data.append('title', 'title');
        data.append('description', 'description');
        // ! require to add issuer name
        // ! require to add issuer serial
        // if(typeof window !== 'undefined'){
        // fetch("http://localhost:3800//issues/create/formdata",{
        //     method: 'POST',
        //     body: data,
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        console.log(data);
        }

    return(
        <form action={SubmitIssues} className='w-[300px] md:w-[400px] flex flex-col'>
            <h1 className='text-center'>Law Support</h1>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" className='border-1 border-gray-300 shadow-md shadow-slate-200  dark:border-gray-700 rounded-lg text-black dark:text-gray-100 hover:shadow-lg hover:shadow-blue-500 duration-300 h-[40px] p-2 focus:outline-none my-4'/>
            <label htmlFor="concern">Concern</label>
            <textarea name="description" id="description" cols={30} rows={10} className='border-1 border-gray-300 shadow-md shadow-slate-200  dark:border-gray-700 rounded-lg text-black dark:text-gray-100 hover:shadow-lg hover:shadow-blue-500 duration-300 h-[320px] p-2 my-4 focus:outline-none'></textarea>
            <button type="submit" className='bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded duration-300 hover:scale-120'
            >Submit</button>
        </form>
    )
}
function TechnicalIssues():JSX.Element{
    async function SubmitIssues(){
        "use server";
        const data = new FormData();
        data.append('title', 'title');
        data.append('description', 'description');
        // ! require to add issuer name
        // ! require to add issuer serial
        // if(typeof window !== 'undefined'){
        // fetch("http://localhost:3800//issues/create/formdata",{
        //     method: 'POST',
        //     body: data,
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        console.log(data);
        }

    return(
        <form action={SubmitIssues} className='w-[300px] md:w-[400px] flex flex-col'>
            <h1 className='text-center'>Report Technical Issues</h1>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" className='border-1 border-gray-300 shadow-md shadow-slate-200  dark:border-gray-700 rounded-lg text-black dark:text-gray-100 hover:shadow-lg hover:shadow-blue-500 duration-300 h-[40px] p-2 focus:outline-none my-4'/>
            <label htmlFor="concern">Concern</label>
            <textarea name="description" id="description" cols={30} rows={10} className='border-1 border-gray-300 shadow-md shadow-slate-200  dark:border-gray-700 rounded-lg text-black dark:text-gray-100 hover:shadow-lg hover:shadow-blue-500 duration-300 h-[320px] p-2 my-4 focus:outline-none'></textarea>
            <button type="submit" className='bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded duration-300 hover:scale-120'
            >Submit</button>
        </form>
    )
}
