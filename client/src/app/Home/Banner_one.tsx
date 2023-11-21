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
        <div>
            <BannerCard data={{
                img: 'banners/banner1.svg',
                title: 'Title',
                altText: 'Description goes here.',
            }} />
        </div>
        <div>
            <h1 className="text-6xl font-bold">Title</h1>
            <p className="text-lg">Description goes here.</p>
        </div>
      </div>
    </section>
  )
}