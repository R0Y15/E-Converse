import { CardProps } from '@/constants'
import Image from 'next/image'
import React from 'react'


const Card = ({ iconURL, cardName, cardDesc, color, handleClick }: CardProps) => {
    return (
        <div className={`${color} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`} onClick={handleClick}>
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
                <Image
                    src={iconURL}
                    alt={cardName}
                    width={27}
                    height={27}
                />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className='text-2xl font-bold'>{cardName}</h1>
                <p className='text-lg font-normal'>{cardDesc}</p>
            </div>
        </div>
    )
}

export default Card