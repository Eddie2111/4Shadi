'use client';
import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

interface IitemProps {
  title: string;
  img: string;
  price: string;
}

export default function CustomCard({item}: IitemProps): JSX.Element {

  return (
        <Card shadow="sm" isPressable className="max-w-[400px]">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[300px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <b> Age: 27 </b>
            <p className="text-default-500">Location: Dhaka</p>
          </CardFooter>
        </Card>
  );
}
