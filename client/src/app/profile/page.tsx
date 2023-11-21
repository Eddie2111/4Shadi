import type {Metadata} from 'next';
import Header from './header';
export const metadata: Metadata = {
    title: 'Profile',
    description: 'Profile page',
}

export default function Profile(): JSX.Element {
    return(
        <div>
            <Header/>
        </div>
    )
}
