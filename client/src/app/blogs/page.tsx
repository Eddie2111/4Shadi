import type {Metadata} from 'next';
import Link from 'next/link';

import CustomCard from '@/components/Cards/CustomCard';

export const metadata:Metadata = {
    title: 'Blogs',
    description: 'Blogs of 4Shadi',
  }

export default async function Page(): JSX.Element {
    const res = await fetch('http://localhost:3700/',{ cache: 'no-store' });
    const data = await res.json();
    // console.log(data);
    return (
        <div className='container mx-10 md:mx-auto'>
        <h1 className="text-2xl font-bold">Blogs</h1>
        <div className='grid grid-cols-3 gap-4'>
            {data.map((item: string[]) => (
                <Link href={`/blogs/${item[0]}`} key={item[0]}>
                <CustomCard key={item[0]} className='mx-10 my-10'>
                    <div className='flex flex-row justify-between'>
                        <h1 className='text-2xl font-bold'>{item[1]}</h1>
                    </div>
                    <p className='text-md truncate my-5'>{item[2]}</p>
                    <div className='flex flex-row justify-between font-light text-sm mt-5'>
                        <p className='text-md'>Author: {item[3]}</p>
                        <p className='text-md'>Published: {item[4]}</p>
                    </div>
                </CustomCard>
                </Link>
            ))}
        </div>
        </div>
    );
}