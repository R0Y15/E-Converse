"use client";

import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { avatarImages } from '@/constants';
import { useToast } from './ui/use-toast';
import { MeetingCardProps } from '@/constants';


const MeetingCard = ({ title, date, icon, isPreviousMeeting, buttonIcon1, buttonText, handleClick, link, deleteMeeting }: MeetingCardProps) => {

    const { toast } = useToast();
    return (
        <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
            <article className='flex flex-col gap-5'>
                <div className='flex flex-row justify-between'>
                    <Image
                        src={icon}
                        alt='upcoming'
                        width={28}
                        height={28}
                    />
                    <Image
                        src='/icons/bin.svg'
                        className={`invert cursor-pointer ${isPreviousMeeting ? 'hidden' : 'block'}`}
                        alt='upcoming'
                        width={35}
                        height={35}
                        onClick={deleteMeeting}
                    />
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">
                            {title}
                        </h1>
                        <p className="text-base font-normal">
                            {date}
                        </p>
                    </div>
                </div>
            </article>
            <article className={`flex justify-center relative`}>
                <div className="relative flex w-full max-sm:hidden">
                    {avatarImages.map((img, idx) => (
                        <Image
                            key={idx}
                            src={img}
                            alt='attendees'
                            width={40}
                            height={40}
                            className={`rounded-full ${idx > 0 ? 'absolute' : ''}`}
                            style={{ top: 0, left: idx * 28 }}
                        />
                    ))}
                    <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
                        +5
                    </div>
                </div>
                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button
                            onClick={handleClick}
                            className='rounded bg-blue-1 px-6'
                        >
                            {buttonIcon1 && (
                                <Image
                                    src={buttonIcon1}
                                    alt='feature'
                                    width={20}
                                    height={20}
                                />
                            )}
                            &nbsp;{buttonText}
                        </Button>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                toast({
                                    title: 'Link Copied',
                                });
                            }}
                            className='bg-dark-4 px-6'
                        >
                            <Image
                                src='icons/copy.svg'
                                alt='feature'
                                width={20}
                                height={20}
                            />&nbsp; Copy Link
                        </Button>
                    </div>
                )}
            </article>
        </section>
    )
}

export default MeetingCard