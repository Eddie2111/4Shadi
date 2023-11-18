import { SignIn } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import type {Metadata} from 'next';
const SignInForm = dynamic(() => import("./form"), { ssr: false });

export const metadata:Metadata = {
  title: {
    default: 'Sign In | 4Shadi',
  },
  description: 'Sign in to your account',
}

export default function Page(): JSX.Element {
  return (
    <center className='flex flex-col md:flex-row-reverse w-full justify-between md:w-[75%] md:mx-auto mx-3'>
      <SignIn />
      <SignInForm />
    </center>
  );
}