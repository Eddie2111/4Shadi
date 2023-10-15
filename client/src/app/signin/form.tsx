'use client';
import React from 'react';
import axios from 'axios';
import {Card, Input, Button} from '@nextui-org/react';
import {EyeFilledIcon} from "@/components/Icons/EyeFilledIcon";
import {EyeSlashFilledIcon} from "@/components/Icons/EyeSlashFilledIcon";
import * as yup from 'yup';
interface IResponseProps{
    id: string;
    message: string;
}
export default function SignInForm() {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const SubmitHandle = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.currentTarget & {
            email: { value: string };
            password: { value: string };
        };
        const email = target.email.value;
        const password = target.password.value;
        // adding validation using yup
        const schema = yup.object().shape({
            email: yup.string().email().required('Enter a valid email please').min(7).max(35),
            password: yup.string().required('Stronger password required').min(6).max(20),
        });
        const isValid = await schema.isValid({
            name,
            email,
            password,
        });
        if (!isValid) {
            alert('Please enter all the fields');
            // add modal here
            return;
        }
        // adding validation using yup
        console.log({name, email, password})
        try {
            const response = await axios.post<IResponseProps>('http://localhost:3400/login/user', {
                email,
                password,
            });
            console.log(response);
            alert('Signed in Successfully');
        } catch (error) {
            console.log(error);
            alert('Error Signing In');
        }
    }
    return (
        <Card className="w-[93%] md:w-[380px] mt-1 p-3" shadow={'md'}>
            <p className='text-center mt-2 text-xl font-semibold'>Sign In using Credentials</p>
            <form onSubmit={SubmitHandle}
                className='justify-center my-2'>
                <Input label="Email" variant="bordered" placeholder="Enter your email" name="email"
                    isClearable
                    className="w-full my-2"
                />
                <Input label="Password" variant="bordered" placeholder="Enter your password" name="password"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    className="w-full my-2" type={isVisible ? "text" : "password"}
                />
                <Button className="w-full my-2 hover:bg-blue-600" color="primary" type='submit'>
                    Sign In
                </Button>
        </form>
        </Card>

    );
    }
