'use client';
import React from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import { Card, Input, Button } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import {z} from "zod";
// !!! remove the any type here from line 29 ///
interface IResponseProps {
  message: string;
  status: number;
  data: {
    message: string;
    status: number;
  };
}

export default function MultiStepForm(): JSX.Element {
  const router = useRouter();
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [id, setID] = React.useState<string>("");
  React.useEffect(()=>{
    localStorage.getItem('id') && setID(localStorage.getItem('id')!);
    localStorage.getItem('name') && setName(localStorage.getItem('name')!);
    localStorage.getItem('email') && setEmail(localStorage.getItem('email')!);
  },[])
    const [step, setStep] = React.useState<number>(1);
    const [inputdata, setInputdata] = React.useState<any>({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputdata({...inputdata, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const collect_data = {...inputdata, serial: id, name, email };
      console.log(collect_data);
      collect_data.age = parseInt(collect_data.age);
      // router.push('/on-board/step2');
      const isValid = InputValidation(collect_data);
      const response = await axios.post<IResponseProps>('http://localhost:3500/profile', collect_data);
      console.log(collect_data, isValid,response.data)
      if (response.data.status === 200){
        alert(response.data.message);
        router.push('/on-board/step2');
      }
    }
    console.log(name,id,email)
  return (

      <form onSubmit={handleSubmit}>
      {
        step === 1 && (
          <Card className='w-72 p-2'>
            <h1>Step 1</h1>
            <div className='flex flex-col border-1 border-gray-300 dark:border-gray-600 rounded-lg px-2 py-2'>
              <label className='text-xs'>Name</label>
              <input className='mb-1 text-sm bg-transparent focus:outline-none' label="Name" variant="bordered" placeholder="Enter your name" name='name' defaultValue={name}/>
            </div>
            <div className='flex flex-col border-1 border-gray-300 dark:border-gray-600 rounded-lg px-2 py-2'>
              <label className='text-xs'>Email</label>
              <input className='mb-1 text-sm focus:outline-none bg-transparent' label="email" type='email' variant="bordered" placeholder="Enter your email" name='email' defaultValue={email}/>
            </div>
            <Button className='my-2' onClick={() => setStep(2)}>Next</Button>
          </Card>
        )
    }
    {
        step === 2 && (
            <Card className='w-72 p-2'>
              <h1>Step 2</h1>
                <div className='flex flex-col border-1 border-gray-300 dark:border-gray-600 rounded-lg px-2 py-2'>
                  <label className='text-xs'>NID Number<span className='text-red-600 text-xs'>*</span></label>
                  <input className='mb-1 text-sm bg-transparent focus:outline-none' label="NID_Number" placeholder="Enter your NID_Number" name='nid_number' onChange={handleChange}/>
                </div>
              <Input className='my-2' label="Birth Certificate" variant="bordered" placeholder="BD-01AC57...." name='birth_cert' onChange={handleChange}/>
              <Input className='my-2' label="Marriage Cetrificate ID" variant="bordered" placeholder="BA-102533..." name='marriage_cert' onChange={handleChange}/>
              <Input className='my-2' label="Age" variant="bordered" placeholder="" onChange={handleChange} name='age' type='number'/>
              <Button className='my-2' onClick={() => setStep(3)}>Next</Button>
              <Button className='my-2' onClick={() => setStep(1)}>Previous</Button>
            </Card>
          )
    }
    {
        step === 3 && (
            <Card className='w-72 p-2'>
              <h1>Step 3</h1>
              <Input className='my-2' label="Phone Number" variant="bordered" placeholder="01xxxxxxx-xx" onChange={handleChange} type='text' name='phone_number'/>
              <Input className='my-2' label="Height" variant="bordered" placeholder="" onChange={handleChange} type='text' name='height'/>
              <Input className='my-2' label="Location" variant="bordered" placeholder="" onChange={handleChange} type='text' name='location'/>
              <Select label="Select your gender" className="max-w-xs my-2" onChange={handleChange} name='gender'>
                  <SelectItem key='Male' value={'Male'}> Male </SelectItem>
                  <SelectItem key='Female' value={'Female'}> Female </SelectItem>
                  <SelectItem key='Other' value={'Other'}> Other </SelectItem>
              </Select>
              <Select label="Whom are you looking for" className="max-w-xs my-2" onChange={handleChange} name='lookingFor'>
                  <SelectItem key='Male' value={'Male'}> Male </SelectItem>
                  <SelectItem key='Female' value={'Female'}> Female </SelectItem>
                  <SelectItem key='Other' value={'Other'}> Other </SelectItem>
              </Select>
              <Input className='my-2' label="Preferences" variant="bordered" placeholder="Eg: Swimming, Walking" onChange={handleChange} type='text' name='preferences'/>
              <Button className='my-2 bg-blue-500' type='submit' >Submit</Button>
              <Button className='my-2' onClick={() => setStep(2)}>Previous</Button>
            </Card>
          )
    }
    </form>

  )
}
import {IUserProps} from '@/types/UserTypes'
function InputValidation(data:IUserProps){
  const schema = z.object({
    serial: z.string().min(10).max(36).nonempty(),
    name: z.string().min(3).max(30).nonempty(),
    email: z.string().email(),
    nid_number: z.string().min(10).max(20).nonempty(),
    birth_cert: z.string().min(10).max(20).nonempty(),
    marriage_cert: z.string().min(10).max(20).nonempty(),
    age: z.number().min(18).max(100),
    phone_number: z.string().min(11).max(20).nonempty(),
    height: z.string().min(2).max(10).nonempty(),
    gender: z.string().nonempty(),
    lookingFor: z.string().nonempty(),
    location: z.string().nonempty(),
    preferences: z.string().nonempty(),
  })
  try{
    const result = schema.parse(data);
    console.log(result);
    return true;
  }
  catch(err){
    console.log(err);
    return err;
  }
}