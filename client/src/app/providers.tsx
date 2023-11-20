'use client'

import {NextUIProvider, Spacer} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {usePathname} from 'next/navigation';
import {ReactLenis} from '@studio-freight/react-lenis';

import Navbar from "@/components/UI/Navbar/index";
import Footer from "@/components/UI/Footer";

export function Providers({children}: { children: React.ReactNode }) {
  const pathname: string = usePathname();
  return (
    <NextUIProvider>
       <NextThemesProvider attribute="class" defaultTheme="dark">
            <Navbar />
              <ReactLenis root>
                {children}
              </ReactLenis>
              <Spacer y={32} />
            {
              pathname.includes('/admin') ? null : <Footer />
            }
       </NextThemesProvider>
    </NextUIProvider>
  )
}
