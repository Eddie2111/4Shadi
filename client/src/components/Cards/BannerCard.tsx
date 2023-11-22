'use client';
import React from "react";
import {Card, CardFooter, Image as NextImage, Button} from "@nextui-org/react";
import Image from "next/image";
interface BannerCardProps {
    data?: {
        img: string;
        title: string;
        altText: string;
    },
    img?: string;
    title?: string;
    altText?: string;
}

export default function BannerCard({data}:BannerCardProps) : JSX.Element {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none w-[18rem] h-[18rem]"
    >
      <img
        alt="Ai generated men for example profile"
        style= {{backgroundSize: 'cover'}}
        height={200}
        src={data.img}
        width={800}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">{data.title || 'John Doe'}</p>
        <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
          {data.altText || "Learn More"}
        </Button>
      </CardFooter>
    </Card>
  );
}
