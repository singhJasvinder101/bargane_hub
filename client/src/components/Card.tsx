import Image from 'next/image'
import Link from 'next/link';
import React, { FC } from 'react'
import { IoIosCopy } from 'react-icons/io';
import { GoCopy } from 'react-icons/go';
import { best_seller } from '../../@types';


const Card: FC<best_seller> = ({ title, image, description, category, price, href_link, last_updated, rank }) => {

    function handleCopy() {
        // #todo: use toast
        navigator.clipboard.writeText('https://www.amazon.in' + href_link.split('/ref=')[0])
    }
    // console.log(href_link)


    return (
        <div className="product-card relative mx-auto">
            <div className="product-card_img-container">
                <Image
                    src={image}
                    alt={title}
                    width={200}
                    height={200}
                    className="product-card_img"
                />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="product-title">{title}</h3>

                <div className="flex justify-between">
                    <p className="text-black opacity-50 text-lg capitalize">
                        {category}
                    </p>

                    <p className="text-black text-lg font-semibold">
                        <span>{price}</span>
                    </p>
                </div>
            </div>
            <span className='absolute text-black top-0 right-0 bg-purple-300 p-3 rounded-bl-3xl'>
                {rank}
            </span>
            <span className='absolute text-black top-0 left-0 p-3 rounded-bl-3xl'>
                <GoCopy onClick={handleCopy} title='copy url' className=' cursor-pointer' />
            </span>
        </div>
    )
}

export default Card
