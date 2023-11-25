import SideBar from '@/components/UI/SideBar'
import UsersTable from './table'
export default function Page():JSX.Element {
    return(
        <div className='flex flex-row'>
            <SideBar/>
            <div className='container mx-32'>
                <h1 className='text-3xl font-bold'>Users</h1>
                <UsersTable/>
            </div>
        </div>
    )
}