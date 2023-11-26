import { SignIn } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import type {Metadata} from 'next';
const SignInForm = dynamic(() => import("./form"), { ssr: false });

export const metadata:Metadata = {
  title: {
    template: 'Sign In | 4Shadi',
    absolute: 'Sign In | 4Shadi',
  },
  description: 'Sign in to your account',
}

export default function Page(): JSX.Element {
  return (
    <div className='flex flex-col md:flex-row-reverse w-full justify-between md:w-[65%] md:mx-auto mx-3 my-10 py-10'>
      <SignIn />
      <SignInForm />
    </div>
  );
}