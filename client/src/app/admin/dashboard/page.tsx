import Link from 'next/link'

import BarChart from './bar'
import SideBar from '@/components/UI/SideBar'
import SimpleCard from '@/components/Cards/SimpleCard'

export default function Page():JSX.Element {
    return(
        <div className='flex flex-row'>
            <SideBar/>
            <div className='container mx-20'>
                <SimpleCard>
                    <h1 className='text-3xl font-bold'>Dashboard</h1>
                    <p className='text-xl'>Welcome to the admin dashboard</p>
                </SimpleCard>
                <div className='flex md:flex-row flex-col w-full'>
                <SimpleCard>
                    <h1 className='text-2xl font-bold'>User Stats</h1>
                    <div className='md:w-[500px] w-[300px] h-[310px] my-5'>
                        <p>New users this month: 0</p>
                        <p>Total users: 0</p>
                        <br/><br/>
                        <div className='pr-5'>
                            <BarChart/>
                        </div>
                    </div>
                </SimpleCard>
                <SimpleCard>
                    <h1 className='text-2xl font-bold'>Issues</h1>
                    <div className='md:w-[500px] w-[300px] h-[240px] my-10'>
                        <p className='font-semibold my-5'>New Issues: 0</p>
                        <p className='font-semibold my-5'>Total Issues: 0</p>
                    </div>
                    <Link href='/admin/issues' className='underline underline-offset-8 hover:text-blue-500 duration-300'> See More </Link>
                </SimpleCard>
                </div>
            </div>
        </div>
    )
}