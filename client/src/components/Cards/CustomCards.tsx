'use client';
import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

interface IitemProps {
  data: {
    title: string;
    img: string;
    age: string;
  };
}
 /*
 * CustomCard component
 * used in choices page
 */
export default function CustomCard({data}: IitemProps): JSX.Element {
  const { name, profileImage, age, location } = data;
  return (
        <Card shadow="sm" isPressable className="w-[300px] m-2">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={name}
              className="w-full object-cover h-[300px]"
              src={profileImage}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{name}</b>
            <b>Age: {age || '27'}</b>
            <p className="text-default-500">Location: {location}</p>
          </CardFooter>
        </Card>
  );
}
