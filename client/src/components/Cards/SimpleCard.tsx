'use client'
import React from 'react'
export default function SimpleCard({ children }: { children: React.ReactNode}): JSX.Element{
    return(
        <div>
        <div className='max-w-[500px] p-5 m-5 max-h-screen border-1 border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-gray-100'>
            {children}
        </div>
        </div>
    )
}