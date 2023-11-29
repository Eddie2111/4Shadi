'use client';
import React from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import { Card, Input, Button } from "@nextui-org/react";
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
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
      const collect_data = {...inputdata, serial:id, name, email, profileImage: '', images: []};
      console.log(collect_data);
      router.push('/on-board/step2');
      // const response = await axios.post<IResponseProps>('http://localhost:3500/profile', collect_data);
      // console.log(response.data)
      // if (response.data.status === 200){
      //   alert(response.data.message);
      //   router.push('/on-board/step2');
      // }
    }
  return (

      <form onSubmit={handleSubmit}>
      {
        step === 1 && (
          <Card className='w-72 p-2'>
            <h1>Step 1</h1>
            <Input className='my-2' label="Name" variant="bordered" placeholder="Enter your email" name='name' defaultValue={name}/>
            <Input className='my-2' label="Email" variant="bordered" placeholder="Enter your email" name='email' defaultValue={email}/>
            <Button className='my-2' onClick={() => setStep(2)}>Next</Button>
          </Card>
        )
    }
    {
        step === 2 && (
            <Card className='w-72 p-2'>
              <h1>Step 2</h1>
              <Input className='my-2' label="NID Number" variant="bordered" placeholder="BD07813654..." name='nid_number' onChange={handleChange}/>
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
              <Select label="Whom are you looking for" className="max-w-xs my-2" onChange={handleChange} name='looking_for'>
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