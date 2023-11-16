'use client'

import {NextUIProvider, Spacer} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import Navbar from "@/components/UI/Navbar/index";
import Footer from "@/components/UI/Footer";
import {ReactLenis} from '@studio-freight/react-lenis';
export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
       <NextThemesProvider attribute="class" defaultTheme="dark">
            <Navbar />
              <ReactLenis root>
                {children}
              </ReactLenis>
              <Spacer y={32} />
            <Footer/>
       </NextThemesProvider>
    </NextUIProvider>
  )
}
