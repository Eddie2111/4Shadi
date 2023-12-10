// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import {HiOutlineMoon} from "react-icons/hi";
import {HiSun} from "react-icons/hi";
import {Button} from "@nextui-org/react";

export default function ThemeSwitcher(): JSX.Element {
  const { theme, setTheme } = useTheme()
  return (
    <div>
        {
        theme === 'dark' ?
            <Button
              onClick={() => setTheme('light')}
              color='secondary' variant='flat'>
                <HiSun className='text-blue-700 text-4xl'/>
            </Button>
            :
            <Button
              onClick={() => setTheme('dark')}
              color='primary' variant='flat'>
                <HiOutlineMoon className='text-white text-4xl'/>
            </Button>
        }
    </div>
  )
};
