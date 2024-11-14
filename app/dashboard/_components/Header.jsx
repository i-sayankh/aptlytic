"use client";

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function Header() {
    const path = usePathname();

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Image src="/Aptlytic.svg" width={160} height={100} alt='Aptlyptic Logo' />
            <ul className='hidden md:flex gap-6'>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                    ${path === '/dashboard' ? 'font-bold text-primary' : ''}`}>
                    Dashboard
                </li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                    ${path === '/dashboard/questions' ? 'font-bold text-primary' : ''}`}>
                    Questions
                </li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                    ${path === '/dashboard/upgrade' ? 'font-bold text-primary' : ''}`}>
                    <Link href="/dashboard/upgrade">Upgrade</Link>
                </li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                    ${path === '/dashboard/how-it-works' ? 'font-bold text-primary' : ''}`}>
                    How it Works?
                </li>
            </ul>
            <UserButton />
        </div>
    )
}

export default Header;