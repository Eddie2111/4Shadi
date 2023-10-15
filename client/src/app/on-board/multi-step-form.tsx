'use client';
import React from "react";
import { Card, Input, Button } from "@nextui-org/react";
export default function MultiStepForm() {
    const [step, setStep] = React.useState<number>(1);
    const [inputdata, setInputdata] = React.useState<any>({});
  return (
    <div>
      {
        step === 1 && (
          <Card className='w-72 p-2'>
            <h1>Step 1</h1>
            <Input label="Email" variant="bordered" placeholder="Enter your email"/>
            <Button onClick={() => setStep(2)}>Next</Button>
          </Card>
        )
    }
    {
        step === 2 && (
            <Card className='w-72 p-2'>
              <h1>Step 2</h1>
              <Button onClick={() => setStep(3)}>Next</Button>
              <Button onClick={() => setStep(1)}>Previous</Button>
            </Card>
          )
    }
    {
        step === 3 && (
            <Card className='w-72 p-2'>
              <h1>Step 3</h1>
              <Button onClick={() => setStep(4)}>Submit</Button>
              <Button onClick={() => setStep(2)}>Previous</Button>
            </Card>
          )
    }
    </div>
  )
}