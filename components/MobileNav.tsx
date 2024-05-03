"use client";

import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sideBarLinks } from '@/constants'
import { usePathname } from 'next/navigation'


const MobileNav = () => {
    const pathname = usePathname();

    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger asChild>
                    <Image
                        src='/icons/hamburger.svg'
                        width={36}
                        height={36}
                        alt='hamburger'
                        className='cursor-pointer sm:hidden'
                    />
                </SheetTrigger>
                <SheetContent side='left' className='border-none bg-dark-1'>
                    <Link
                        href='/'
                        className='flex items-center gap-1'
                    >
                        <Image
                            src='/icons/logo.svg'
                            width={50}
                            height={50}
                            alt='Yoom Logo'
                            className='max-sm:size-10'
                        />
                        <p className='text-[26px] font-extrabold text-white m-1'>E-Converse</p>
                    </Link>

                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">

                    <SheetClose asChild>
                        <section className="flex h-full flex-col gap-6 pt-16 text-white">
                            {sideBarLinks.map((link) => {
                                const isActive = pathname === link.route;

                                return (
                                    <SheetClose asChild key={link.route}>
                                    <Link
                                        href={link.route}
                                        key={link.label}
                                        className={`flex gap-5 items-center p-4 rounded-lg w-full max-w-60 ${isActive ? 'bg-blue-1' : ''}`}
                                    >
                                        <Image
                                            src={link.imgUrl}
                                            alt='sidebar-image'
                                            width={24}
                                            height={24}
                                        />
                                        <span className='border h-full opacity-20 mx-1'/>
                                        <p className='text-lg font-semibold'>
                                            {link.label}
                                        </p>
                                    </Link>
                                    </SheetClose>
                                );
                            })}
                        </section>
                    </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav