"use client"

import Search from "@/components/Search";
import { Trending } from "@/actions/product_actions";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";
import CurrencyConverter from "@/components/CurrencyConvertor";
import useProfile from "../components/useProfile";
import { trackProducts } from "../../@types";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState([]);
  const [isUpdatedPrices, setIsUpdatedPrices] = useState<boolean | null>(false)
  const { UserData: userData } = useProfile();

  useEffect(() => {
    const priceHistString = localStorage.getItem('priceHistory')
    const priceHistory = typeof priceHistString === "string" ? JSON.parse(priceHistString as string) : []
    // console.log(priceHistory)
    // console.log(userData?.tracks)
    userData?.tracks?.forEach((track: trackProducts, i: number) => {
      const prev_price = priceHistory[i]?.price_history
      const curr_price = track.price_history
      console.log(prev_price, curr_price)

      if (prev_price?.length !== curr_price?.length) {
        // console.log('price history length mismatch')
        localStorage.setItem('priceHistory', JSON.stringify(userData?.tracks))
        setIsUpdatedPrices(true)
        return
      }
    })
  }, [userData?.tracks])
  // useEffect(() => {
  // localStorage.setItem('priceHistory', JSON.stringify(userData?.tracks))
  // localStorage.removeItem('priceHistory')
  // }, [userData])
  
  useEffect(() => {
    console.log(isUpdatedPrices)
  }, [userData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingData = await Trending();
        setData(trendingData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const electronics = useMemo(() => data.filter((product: any) => product?.category === "electronics"), [data]);
  const shoes = useMemo(() => data.filter((product: any) => product.category === "shoes"), [data]);
  const beauty = useMemo(() => data.filter((product: any) => product.category === "beauty"), [data]);


  return (
    <main>
      <div className="w-full h-[23rem] relative">
        <Image alt="banner" quality={100} layout="fill" className="w-full object-cover" src={'/assets/banner2.jpg'} />
        <div className="absolute bottom-0 left-0 w-full">
          <Search />
        </div>
      </div>

      <div className="flex justify-between">
        <CurrencyConverter />
        <div className="p-8 mt-3 bg-slate-100 rounded-xl md:w-[49%]">
          <h2 className='text-xl text-purple-600 right-10'>Your Tracks</h2>
          {!isUpdatedPrices ? (
            <>
              <p className="">OOps! Nothing to show </p>
              <p>Track More Products earliest to get started bargane</p>
            </>
          ) : (
              <>
                <p>✨Your Tracks Updated  Be the first to bargain</p>
                ✨ <Link className="text-purple-600 text-sm" href={'/dashboard'}>Visit Dashboard</Link>
              </>
          )}
        </div>
      </div>

      <div className="py-16">
        {/* #todo: font change */}
        <h1 className="text-5xl font-bold flex flex-col gap-3 merriweather-bold">
          Trending
          <span className="bg-purple-500 h-[0.3rem] rounded-xl w-[11rem]"></span>
        </h1>

        <div className="flex md:flex-col my-12">
          <div className="flex flex-wrap">
            {electronics.slice(0, 12).map((product: any) => (
              <div className="col-4 my-8" key={product.id}>
                <Card
                  title={product.title}
                  image={product.image}
                  description={product.description}
                  category={product.category}
                  price={product.price}
                  href_link={product.href_link}
                  last_updated={product.last_updated}
                  rank={product.rank}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap">
            {shoes.slice(0, 12).map((product: any) => (
              <div className="col-4 my-8" key={product.id}>
                <Card
                  title={product.title}
                  image={product.image}
                  description={product.description}
                  category={product.category}
                  price={product.price}
                  href_link={product.href_link}
                  last_updated={product.last_updated}
                  rank={product.rank}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap">
            {beauty.slice(0, 12).map((product: any) => (
              <div className="col-4 my-8" key={product.id}>
                <Card
                  title={product.title}
                  image={product.image}
                  description={product.description}
                  category={product.category}
                  price={product.price}
                  href_link={product.href_link}
                  last_updated={product.last_updated}
                  rank={product.rank}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
