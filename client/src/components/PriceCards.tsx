
import React, { FC } from 'react'
import { IconType } from 'react-icons';

interface priceProps {
    title: string;
    price: string;
    Icon: IconType;
    color?: string;
}

const PriceCards: FC<priceProps> = ({
    title,
    price,
    Icon,
    color
}) => {
    return (
        <div className={`bg-purple-200 min-w-[280.86px] py-4 px-16 rounded-xl  flex flex-col justify-center items-center`}>
            <p className="text-xl font-bold text-black-100">{title}</p>

            <div className="flex gap-1">
                <Icon title={title} className='icons' color={color} />

                <p className={`text-2xl px-3 font-bold text-${color}-700`}>{price[0] + Math.ceil(Number(price.substring(1)))}</p>
            </div>
        </div>
    )
}

export default PriceCards
