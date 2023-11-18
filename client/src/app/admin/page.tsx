import type {Metadata} from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
    title: 'Admin',
    description: 'Admin login page',
}

export default function Admin(): JSX.Element{
    return <LoginForm />
}