import SideBar from '@/components/UI/SideBar'
import SimpleCard from '@/components/Cards/SimpleCard'
import CreatePost from './CreatePost'
import DeleteButton from './components/DeletePost'
import EditButton from './components/EditPost'
export default async function Page(): JSX.Element {
  const getData = async () => {
    'use server';
    const res = await fetch('http://localhost:3700/');
    const data = await res.json();
    return data;
  };
  const data = await getData();

  return (
    <div>
      <SideBar />
      <div className="container mx-20">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <CreatePost />
        {data.map((item: string[]) => (
          <div key={item[0]} className='mx-10 my-10'>
            <SimpleCard>
                <div className='flex flex-row justify-between'>
                    <h1 className='text-2xl font-bold'>{item[1]}</h1>
                    <div className='flex flex-row ml-5'>
                        <EditButton id={item[0]} ButtonName={'Edit'} Title={'Edit Blog'} />
                        <DeleteButton id={item[0]} ButtonName={'Delete'} Title={'Delete Blog'} Description={ 'Are you sure to delete this Blog?' } />
                    </div>
                </div>
                <p className='text-md truncate my-5'>{item[2]}</p>
                <div className='flex flex-row justify-between font-light text-sm mt-5'>
                    <p className='text-md'>Author: {item[3]}</p>
                    <p className='text-md'>Published: {item[4]}</p>
                </div>
            </SimpleCard>
          </div>
        ))}
      </div>
    </div>
  );
}