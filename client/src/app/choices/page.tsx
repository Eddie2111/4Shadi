import CustomCard from '@/components/Cards/CustomCards';
import type {Metadata} from 'next';
export const meta: Metadata = {
    title: {
        default: 'Choices'
    },
    description: 'Choices for your wedding partner and wedding planning',
}
export default function index(): JSX.Element {
    const list = [
        {
          title: "Orange",
          img: "https://nextui.org/images/hero-card-complete.jpeg",
          price: "$5.50",
        },
        {
          title: "Tangerine",
          img: "https://nextui.org/images/album-cover.png",
          price: "$3.00",
        },
        {
          title: "Raspberry",
          img: "https://nextui.org/images/fruit-8.jpeg",
          price: "$10.00",
        },
        {
          title: "Lemon",
          img: "https://nextui.org/images/fruit-5.jpeg",
          price: "$5.30",
        },
        {
          title: "Avocado",
          img: "https://nextui.org/images/fruit-3.jpeg",
          price: "$15.70",
        },
        {
          title: "Lemon 2",
          img: "https://nextui.org/images/fruit-1.jpeg",
          price: "$8.00",
        },
        {
          title: "Banana",
          img: "https://nextui.org/images/card-example-3.jpeg",
          price: "$7.50",
        },
        {
          title: "Watermelon",
          img: "https://nextui.org/images/card-example-2.jpeg",
          price: "$12.20",
        },
      ];
    return(
        <div className='container mx-auto px-auto my-10'>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                {
                    list.map((item, index) => (
                        <CustomCard key={index} item={item} />
                    ))
                }
            </div>
            <div className="flex md:flex-row flex-col justify-between mt-10">
                <div className='flex flex-col'>
                  From your location
                  {/* render only three elements from the list */}
                  {
                    list.slice(0,3).map((item, index) => (
                        <CustomCard key={index} item={item} />
                    ))
                  }
                </div>
                <div className='flex flex-col'>
                  Matches your Preferences
                  {
                    list.slice(5,8).map((item, index) => (
                        <CustomCard key={index} item={item} />
                    ))
                  }
                </div>
                <div className='flex flex-col'>
                  Recommended
                  {
                    list.slice(2,5).map((item, index) => (
                        <CustomCard key={index} item={item} />
                    ))
                  }
                </div>
            </div>
        </div>
    )
}