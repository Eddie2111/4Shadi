// import Image from 'next/image';
import {Image} from '@nextui-org/react';
export default function Brand_Image():JSX.Element {
  return (
      <Image
        src="/brand_logo_hero.png"
        alt="brand-logo"
        width={700}
        height={300}
      />
  )
}