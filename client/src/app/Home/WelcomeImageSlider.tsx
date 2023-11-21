'use client';
import React from 'react';
import {Image} from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
export default function WelcomeImageSlider() {
    return (
        <div className='md:mt-72 md:w-[40rem]'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                modules={[Autoplay, Pagination ]}>
                <SwiperSlide>
                    <Image
                        src='https://www.nijolcreative.com/wp-content/uploads/2023/07/The-Best-Wedding-Photography-Bangladesh-by-Nijol-Creative-Photography.jpg'
                        width={'100%'}
                        height={'100px'}
                        alt='Wedding Photography'
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src='https://personallyabid.files.wordpress.com/2010/04/dsc006821.jpg'
                        width={'100%'}
                        height={'100px'}
                        alt='Wedding Photography'
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src='https://riss-photography.com/wp-content/uploads/2020/09/Wedding-Photography-Paradiso-Receptions-Liverpool-8.jpg'
                        width={'100%'}
                        height={'100px'}
                        alt='Wedding Photography'
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src='https://i.ytimg.com/vi/PD6QN9-NZKo/maxresdefault.jpg'
                        width={'100%'}
                        height={'100px'}
                        alt='Wedding Photography'
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}