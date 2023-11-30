import Image from 'next/image'
import type { Metadata, ResolvingMetadata } from 'next'
type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const id = params.slug
    // fetch data
    const blog = await fetch("http://localhost:3700/get_one?id="+id).then((res) => res.json())

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []

    return {
      title: blog[1],
      metadataBase: new URL('https://picsum.photos/id/'),
      openGraph: {
          images: `${blog[1].length}` || '10'
      },
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const getdata = await fetch('http://localhost:3700/get_one?id='+params.slug);
    const data = await getdata.json();

    const richtext = data[2].replace(/<[^>]*>?/gm, '');
    // console.log(richtext)
    return (
        <div className='container mx-10 md:mx-auto'>
        <h1 className="text-2xl font-bold">Blogs</h1>

                <div className='mx-10 my-10'>
                    <div className='flex flex-row justify-between'>
                        <h1 className='text-2xl font-bold'>{data[1]}</h1>
                    </div>
                    <center className='my-5'>
                        <Image src={`https://picsum.photos/id/${data[1].length}/800/1000`} width={300} height={300} alt='blog image' />
                    </center>
                    <div style={{ whiteSpace: 'pre-line' }} className='my-5'>
                        {richtext}
                    </div>
                    <div className='flex flex-row justify-between font-light text-sm mt-5'>
                        <p className='text-md'>Author: {data[3]}</p>
                        <p className='text-md'>Published: {data[4]}</p>
                    </div>

        </div>
        </div>
    );

  }