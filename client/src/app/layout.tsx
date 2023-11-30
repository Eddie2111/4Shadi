import './globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Providers} from "./providers";
import {ClerkProvider} from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		template: '%s | 4Shadi',
		default: 'Home | Welcome to 4Shadi',
	},
	description:  '4Shadi is a wedding planning service that helps you plan your wedding with ease.',
};

export const revalidate:number = 600;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <Providers>
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  )
}
