'use client';
export default function Badge({ data }: { data: string }) {
  const onClickFunction = () => {
    console.log(data);
  }
  return (
    <button onClick={onClickFunction} className='bg-blue-500 rounded-lg p-1 hover:bg-blue-700 duration-300 text-lg font-medium text-gray-100'>
      {data}
    </button>
  );
}