import type {Metadata} from 'next';

import WelcomeImageSlider from './Home/WelcomeImageSlider';
import Brand_Image from './Home/Brand-logo';
import Banner_one from './Home/Banner_one';
export const metadata:Metadata = {
  title: 'Home',
  description: 'Welcome Home',
}


export default function Home():JSX.Element {
  return (
    <>
    <div className='container mx-auto flex flex-col md:flex-row justify-center'>
      <Brand_Image />
      <WelcomeImageSlider />
    </div>
    <Banner_one />
    </>
  )
}
/**
 * openGraph: {
    title: 'Home',
    description: 'Welcome Home',
    images: [
      'https://e7.pngegg.com/pngimages/1008/184/png-clipart-wedding-invitation-the-lash-studio-logo-wedding-angle-white-thumbnail.png'
    ]
  }
 */