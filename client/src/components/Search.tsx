"use client"
import { scrapProduct } from '@/actions/product_actions'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MdOutlineManageSearch } from 'react-icons/md'

const Search = () => {
    const [id, setId] = useState<any>('')
    const [search, setSearch] = useState<string | null>('')
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const { data } = await scrapProduct(search as string)
            console.log(data)
            if (data) {
                router.push(`/product/${data}`)
            }
        } catch (error) {
            console.log(error)
        }
        setId(id)
    }

    // useEffect(() => {
    //     console.log(id)
    // }, [id])

    return (
        <div className="w-[30rem] mx-auto relative">
            <input
                onKeyPress={(e: any) => e.key === 'Enter' && handleSubmit(e)}
                onChange={(e: any) => { setSearch(e.target.value) }}
                type="text"
                className="w-[30rem] absolute bottom-[-1rem] p-3 outline-none bg-white"
                placeholder="Search for products, brands and more"
            />
            <MdOutlineManageSearch className="absolute bottom-0 right-[2%] w-7 h-9" />
        </div>
    )
}

export default Search
