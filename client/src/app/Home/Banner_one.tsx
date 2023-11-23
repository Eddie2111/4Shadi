// import Image from 'next/image';
'use client';
import {Image} from '@nextui-org/react';

import BannerCard from '@/components/Cards/BannerCard';
export default function Banner_one():JSX.Element {
  return (
    <section className="relative h-screen flex items-center my-10">
      <div
        className="absolute inset-0 w-full h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: `url('banners/banner1.svg')` }}
      />
      <div className="relative z-10 flex flex-row items-center justify-center text-white h-52 mx-auto">
        <div className='mx-5'>
            {/*https://i.pngimg.me/thumb/f/720/cd844b54e6.jpg */}
            {/*https://www.the-sun.com/wp-content/uploads/sites/6/2023/02/AS_AI-WOMEN_OP.jpg?strip=all&quality=100&w=1620&h=1080&crop=1 */}
            <BannerCard data={{
                img: 'https://queerty-prodweb.s3.amazonaws.com/2023/06/2.-electronic-evan.jpg',
                title: 'Title',
                altText: 'Description goes here.',
            }} />
        </div>
        <div>
            <h1 className="text-6xl font-bold w-[320px] mx-5">Choose your best choice from here</h1>
            <p className="text-lg">We consider your location, preference and long lasting as well.</p>
        </div>
      </div>
    </section>
  )
}