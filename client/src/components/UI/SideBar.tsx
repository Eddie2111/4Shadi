'use client';
import React, { useState } from 'react';
import {AlertOctagon,ArrowLeftRight, BarChart4, ChevronLeftSquare, LogOut, LayoutDashboard, Menu, Users} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const liColor = 'p-[20px] text-center border-b-[1px] border-gray-100 hover:bg-gray-400 hover:text-blue-700 duration-300';
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

  return (
        <div className={
            isExpanded
                ? 'w-60 h-screen bg-gray-200 dark:bg-black transition-all duration-300 ease-in-out fixed'
                : 'w-16 h-screen bg-gray-200 dark:bg-black transition-all duration-300 ease-in-out fixed'
        }>
        <button onClick={toggleSidebar} className="w-full p-[10px] bg-gray-300 dark:bg-gray-800 text-white border-none text-left pointer-cursor">
            {isExpanded ? <ChevronLeftSquare size={24} className='text-gray-700 dark:text-gray-200'/> : <Menu size={24} className='text-gray-800 dark:text-gray-200'/>}
        </button>
        <ul className='list-none'>
            <li className={liColor}>
                <Link href='/admin/dashboard'>
                {
                    isExpanded
                        ? <p> Dashboard </p>
                        : <BarChart4 size={24} className='text-black dark:text-white '/>
                }
                </Link>
            </li>
            <li className={liColor}>
                <Link href='/admin/blogs'>
                {
                    isExpanded
                        ? <p> Blogs </p>
                        : <LayoutDashboard size={24} className='text-black dark:text-white '/>
                }
                </Link>
            </li>
            <li className={liColor}>
                <Link href='/admin/users'>
                {
                    isExpanded
                        ? <p> Users </p>
                        : <Users size={24} className='text-blue-500'/>
                }
                </Link>
            </li>
            <li className={liColor}>
                <Link href='/admin/payments'>
                {
                    isExpanded
                        ? <p> Payments </p>
                        : <ArrowLeftRight size={24} className='text-green-600'/>
                }
                </Link>
            </li>
            <li className={liColor}>
                <Link href='/admin/issues'>
                {
                    isExpanded
                        ? <p> Issues </p>
                        : <AlertOctagon size={24} className='text-red-300'/>
                }
                </Link>
            </li>
            <li className={liColor}>
                <Link href='/admin/logout'>
                {
                    isExpanded
                        ? <p> Logout </p>
                        : <LogOut size={24} className='text-red-500'/>
                }
                </Link>
            </li>
        </ul>
        </div>
  );
};

export default Sidebar;
