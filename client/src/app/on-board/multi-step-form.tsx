'use client';
import React from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import { Card, Input, Button } from "@nextui-org/react";
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
      const collect_data = {...inputdata, serial:id, name, email};
      console.log(collect_data);
      const response = await axios.post<IResponseProps>('http://localhost:3500/profile', collect_data);
      console.log(response.data)
      if (response.data.status === 200){
        alert(response.data.message);
        router.push('/profile');
      }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      {
        step === 1 && (
          <Card className='w-72 p-2'>
            <h1>Step 1</h1>
            <Input label="Name" variant="bordered" placeholder="Enter your email" name='name' defaultValue={name}/>
            <Input label="Email" variant="bordered" placeholder="Enter your email" name='email' defaultValue={email}/>
            <Button onClick={() => setStep(2)}>Next</Button>
          </Card>
        )
    }
    {
        step === 2 && (
            <Card className='w-72 p-2'>
              <h1>Step 2</h1>
              <Input label="NID Number" variant="bordered" placeholder="BD07813654..." name='nid_number' onChange={handleChange}/>
              <Input label="Birth Certificate" variant="bordered" placeholder="BD-01AC57...." name='birth_cert' onChange={handleChange}/>
              <Input label="Marriage Cetrificate ID" variant="bordered" placeholder="BA-102533..." name='marriage_cert' onChange={handleChange}/>
              <Input label="Age" variant="bordered" placeholder="" onChange={handleChange} name='age' type='number'/>
              <Button onClick={() => setStep(3)}>Next</Button>
              <Button onClick={() => setStep(1)}>Previous</Button>
            </Card>
          )
    }
    {
        step === 3 && (
            <Card className='w-72 p-2'>
              <h1>Step 3</h1>
              <Input label="Phone Number" variant="bordered" placeholder="01xxxxxxx-xx" onChange={handleChange} type='text' name='phone_number'/>
              <Input label="Height" variant="bordered" placeholder="" onChange={handleChange} type='text' name='height'/>
              <Input label="Location" variant="bordered" placeholder="" onChange={handleChange} type='text' name='location'/>
              <Input label="Preferences" variant="bordered" placeholder="Your hobbys..." onChange={handleChange} type='number' name='preferences'/>
              <Button type='submit' >Submit</Button>
              <Button onClick={() => setStep(2)}>Previous</Button>
            </Card>
          )
    }
    </form>
    </div>
  )
}