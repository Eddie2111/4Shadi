'use client';
import { z } from "zod";
import {useRouter} from 'next/navigation';
import React from "react";
export default function Login(): JSX.Element{
    const router = useRouter();
    const [isSending, setIsSending] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);
    const FormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);
        const AdminProps = z.object({
            email: z.string().email().max(35).trim(),
            password: z.string().regex(/^[a-zA-Z0-9!.]{6,16}$/).max(16).min(6),
        })
        const data = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
        }
        try{
            setErrors([])
            const result = AdminProps.parse(data)
            if (
                result.email === 'admin@4shadi.com' && result.password === 'admin1234..'
            ){
                router.push('/admin/dashboard')
            }
            else{
                setErrors([])
                setErrors(['Email or password is invalid'])
                setIsSending(false);
            }
            console.log(result)
        }
        catch(error){
            console.log(
                error.errors.map((err) => {
                    setErrors([...errors, err.message])
                })
            )
            setIsSending(false);
        }
    }
    return(
        <div className='container mx-auto px-auto justify-center'>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full">
                <div className="container w-[32rem] mx-auto py-10 border-1 border-gray-400 rounded-lg ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">Sign in to your account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={FormSubmit}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">Email address</label>
                                <div className="mt-2">
                                <input id="email" name="email" type="email"  required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">Password</label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                </div>
                                </div>
                                <div className="mt-2">
                                <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                {
                                    isSending ?
                                        <button type="submit" disabled className="px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm text-gray-700 flex w-full justify-center rounded-md border-1 border-gray-700 dark:border-white hover:dark:shadow-white hover:dark:shadow-md hover:text-white hover:bg-black duration-300 dark:bg-white dark:text-black ">
                                            Loading...
                                        </button>
                                        :
                                        <button type="submit" className="px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm text-gray-700 flex w-full justify-center rounded-md border-1 border-gray-700 dark:border-white hover:dark:shadow-white hover:dark:shadow-md dark:text-white hover:text-white hover:bg-black duration-300 hover:dark:bg-white hover:dark:text-black ">
                                            Sign in
                                        </button>

                                }
                            </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?
                            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                            </p>
                                <p>
                                {errors.map((err, index) => (
                                    <div key={index} className="text-red-500">
                                    {err.includes('email') ? (
                                        <p className="text-red-500">Email is invalid</p>
                                    ) : (
                                        <p className="text-red-500">Password is invalid</p>
                                    )}
                                    </div>
                                ))}
                                </p>
                        </div>
                    </div>
                </div>

        </div>
    )
}