
import { SignUp } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import type {Metadata} from 'next';
const SignUpForm = dynamic(() => import("./form"), { ssr: false });

export const metadata:Metadata = {
  title: 'Sign Up | 4Shadi',
  description: 'Sign up for an account',
}
export default function Page() {
  return (
    <center className='flex flex-col md:flex-row-reverse w-full justify-between md:w-[75%] md:mx-auto mx-3'>
      <SignUp />
      <SignUpForm />
    </center>
  );
}