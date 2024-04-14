"use client"
import { getScrapById } from '@/actions/product_actions'
import Modal from '@/components/EmailModal';
import PriceCards from '@/components/PriceCards';
import ProductImageComponent from '@/components/ProductImageComponent';
import useModal from '@/hooks/useModal';
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from 'react';
import { FaChartBar, FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { IoIosPricetags, IoIosShareAlt } from "react-icons/io";
import { TiStarFullOutline } from "react-icons/ti";

const page = ({ params }: { params: string }) => {
    const { id } = params as any

    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await getScrapById(id);
                // console.log(productData);
                setProduct(productData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const modal = useModal()

    const handleOpen = useCallback(() => {
        setTimeout(() => {
            modal.onOpen()
        }, 300);
    }, [modal.isOpen])

    useEffect(() => {
        handleOpen()
    }, [])

    if (!product) return <div>Loading...</div>;

    // console.log(product.description)

    return (
        <div className="product-container">
            <div className="flex gap-28 xl:flex-row flex-col">
                <div className="product-image">
                    {/* <Image
                        src={product.image}
                        alt={product.title}
                        width={580}
                        height={400}
                        quality={100}
                        className="mx-auto"
                    /> */}
                    <ProductImageComponent
                        width={580}
                        height={400}
                        src={product.image}
                        alt={product.title}
                    />
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
                        <div className="flex flex-col gap-3">
                            <p className="text-[28px] text-black font-bold">
                                {product.title}
                            </p>

                            <Link
                                href={product.url}
                                target="_blank"
                                className="text-base decoration-white text-gray-600 font-semibold"
                            >
                                👉🏼 <span className='text-purple-500'>Visit Product</span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-red-100 p-2 rounded-2xl">
                                <FaRegHeart className='icons' title='Likes' color="red" />

                                <span className="text-base px-2 font-semibold text-[#D46F77]">
                                    {product.reviews_count || '10 ratings'}
                                </span>
                            </div>

                            <div className="p-2 bg-white-200 rounded-10">
                                <FaRegBookmark className='icons' title='Bookmark' />
                            </div>

                            <div className="p-2 bg-white-200 rounded-10">
                                <IoIosShareAlt className='icons' title='Share' />
                            </div>
                        </div>
                    </div>

                    <div className="product-info">
                        <div className="flex flex-col gap-2">
                            <p className="text-[34px] text-secondary font-bold">
                                {product.currency} {(product.current_price)}
                            </p>
                            <p className="text-[21px] text-black opacity-50 line-through">
                                {product.currency} {(product.original_price)}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3">
                                <div className="product-stars flex items-center">
                                    <p className="text-md flex items-center text-primary-orange m-0 px-3 font-semibold">
                                        {Array.from({ length: Math.floor(product.stars) }).map((_, i) => (
                                            <TiStarFullOutline key={i} />
                                        ))}
                                        <span className='px-1'>{product.stars}</span>
                                    </p>
                                </div>

                                <div className="product-reviews">
                                    <p className="text-md m-0 py-2 text-gray-600 font-semibold">
                                        {product.reviews_count} Reviews
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm text-black">
                                <span className="text-primary-green font-semibold">93% </span> of
                                buyers have recommeded this.
                            </p>
                        </div>
                    </div>

                    <div className="my-7 flex flex-col gap-5">
                        <div className="flex gap-5 justify-between">
                            <PriceCards
                                title="Current Price"
                                Icon={IoIosPricetags}
                                price={`${product.currency} ${(product.current_price)}`}
                                color='purple'
                                key={1}
                            />
                            <PriceCards
                                title="Average Price"
                                Icon={FaChartBar}
                                price={`${product.currency} ${(product.average_price)}`}
                                color='orange'
                                key={2}
                            />
                        </div>
                        <div className="flex gap-5 justify-between">
                            <PriceCards
                                title="Highest Price"
                                Icon={FaArrowTrendUp}
                                price={`${product.currency} ${(product.highest_price)}`}
                                color='green'
                                key={3}
                            />
                            <PriceCards
                                title="Lowest Price"
                                Icon={FaArrowTrendDown}
                                price={`${product.currency} ${(product.lowest_price)}`}
                                color='red'
                                key={4}
                            />
                        </div>
                    </div>

                    <button className='bg-purple-500 p-3 text-white font-bold text-base rounded-xl' onClick={handleOpen}>
                        Track
                    </button>
                    <Modal id={id} />
                </div>
            </div>

            <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-5">
                    <h3 className="text-4xl font-bold flex flex-col gap-3">
                        Product Description
                        <span className='bg-purple-500 h-[0.3rem] rounded-xl w-[16rem]'></span>
                    </h3>

                    <div className="flex description flex-col gap-4">
                        {product?.description && (
                            <p className='text-xl leading-relaxed' dangerouslySetInnerHTML={{ __html: product?.description }} />
                        )}
                    </div>
                </div>

                <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
                    <Image
                        src="/assets/icons/bag.svg"
                        alt="check"
                        width={22}
                        height={22}
                    />

                    <Link href="/" className="text-base text-white">
                        Buy Now
                    </Link>
                </button>
            </div>

            {/* {similarProducts && similarProducts?.length > 0 && (
                <div className="py-14 flex flex-col gap-2 w-full">
                    <p className="section-text">Similar Products</p>

                    <div className="flex flex-wrap gap-10 mt-7 w-full">
                        {similarProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )} */}
        </div>
    )
}

export default page
