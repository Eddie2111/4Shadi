import CustomCard from '@/components/Cards/CustomCards';
import SearchAndSort from './SearchAndSort';
import type {Metadata} from 'next';
import RandomChoices from './randomChoices';
export const metadata: Metadata = {
    title: {
        template: 'Choices',
        absolute: 'Choices',
    },
    description: 'Choices for your wedding partner and wedding planning',
}
export default function index(): JSX.Element {

    return(
        <div className='container mx-auto px-auto my-10'>
            <div className='flex flex-col my-2'>
                <h1 className='text-3xl font-bold'>Choices</h1>
                <p className='text-sm'>Use the tags to get the best choices for you</p>
            </div>
            <SearchAndSort/>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">

            </div>
            <div className="flex md:flex-row flex-col justify-between mt-10">
                <div className='flex flex-col'>
                  From your location
                  {/* render only three elements from the list */}
                  <RandomChoices/>
                </div>
                <div className='flex flex-col'>
                  Matches your Preferences
                  <RandomChoices/>
                </div>
                <div className='flex flex-col'>
                  Recommended
                  <RandomChoices/>
                </div>
            </div>
        </div>
    )
}
