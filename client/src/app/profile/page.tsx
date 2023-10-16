import type {NextPage, Metadata} from 'next';
import Header from './header';
export const metadata: Metadata = {
    title: 'Profile | 4Shadi',
    description: 'Profile page',
}

export default function Profile(): NextPage {
    return(
        <div>
            <Header/>
        </div>
    )
}