'use client'

import {NextUIProvider, Spacer} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import Navbar from "@/components/UI/Navbar";
import Footer from "@/components/UI/Footer";
export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
       <NextThemesProvider attribute="class" defaultTheme="dark">
            <Navbar />
                {children}
              <Spacer y={32} />
            <Footer/>
       </NextThemesProvider>
    </NextUIProvider>
  )
}