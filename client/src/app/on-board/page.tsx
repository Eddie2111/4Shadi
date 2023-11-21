import MultiStepForm from "./multi-step-form"
export default function OnBoard(): JSX.Element{
    return(
        <div className='container mx-auto px-auto justify-center w-72'>
            <h1 className='text-center my-5'>Welcome to 4Shadi</h1>
            <MultiStepForm/>
        </div>
    )
}