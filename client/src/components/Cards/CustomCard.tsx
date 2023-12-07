'use client'
import React from 'react'
import {motion} from 'framer-motion'
export default function SimpleCard(
    { children }:
    { children: React.ReactNode}
    ) : JSX.Element{

    const CoreStyles: string = `
        max-w-[500px] p-5 m-5 max-h-screen
        border-1 border-gray-300 shadow-md
        shadow-gray-400  dark:border-gray-700
        rounded-lg text-black dark:text-gray-100
        hover:shadow-lg hover:shadow-blue-500
        duration-300`

    return(
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 3
            }}
            className={CoreStyles}
            >
        <div>
            <div>
                {children}
            </div>
        </div>
        </motion.div>
    )
}
