import type {Metadata} from 'next';

import WelcomeImageSlider from './Home/WelcomeImageSlider';

export const metadata:Metadata = {
  title: 'Home',
  description: 'Welcome Home',
}


export default function Home():JSX.Element {
  return (
    <div>
      <WelcomeImageSlider />
    </div>
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