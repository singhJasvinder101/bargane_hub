"use client"

import { subscribeUser } from '@/actions/product_actions'
import Button from '@/components/Button'
import useModal from '@/hooks/useModal'
import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

const Modal = ({ id }: { id: number }) => {
    const modal = useModal()
    const [showModal, setShowModal] = useState(false)
    const isOpen = modal.isOpen
    const [email, setEmail] = useState<string | null>('')

    useEffect(() => {
        setShowModal(true)
    }, [isOpen])

    const handleClose = useCallback(() => {
        setShowModal(false)
        setTimeout(() => {
            modal.onClose()
        }, 300)
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const data = await subscribeUser(email as string, id)
            // console.log(data)
            handleClose()
        } catch (error: any) {
            console.log(error?.message)
        }
    }


    if (!isOpen) return null


    return (
        <div>
            <div
                className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
          h-full
        "
                onClick={modal.onClose}
            >
                <div className="
          relative 
          w-full
          md:w-4/6
          lg:w-[32rem]
          mt-0
          mx-auto 
          h-auto
          lg:h-auto
          md:h-auto
          "
                >
                    {/*content*/}
                    <div className={`
            translate
            duration-300
            h-full
           ${showModal ? 'opacity-100' : 'opacity-0'}
            ${showModal ? 'scale-100' : 'scale-0'}
          `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
            "
                        >
                            {/*header*/}

                            <div className="
                flex 
                items-center 
                p-4 
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
                            >
                                <button
                                    onClick={handleClose}
                                    className="
                    pt-2
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    right-9
                  "
                                >
                                    <IoMdClose className='close' />
                                </button>

                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <div className="p-6 flex-auto">
                                    <span className="text-2xl mb-2 font-semibold">
                                        Unlock Savings: Get Notified on Price Drops! 💸
                                    </span>
                                    <p className="text-lg pt-4">
                                        Never miss a bargain again with our timely alerts!
                                    </p>
                                    <form className="mt-6" onSubmit={handleSubmit} >
                                        <input
                                            onChange={(e: any) => setEmail(e.target.value)}
                                            type="email"
                                            placeholder="Your email address"
                                            className="
                    w-full 
                    py-2 
                    px-4 
                    border 
                    border-gray-300 
                    rounded-md 
                    focus:outline-none 
                    focus:border-purple-500 
                    transition 
                    duration-300 
                    placeholder-gray-400 
                    focus:ring-2 
                    focus:ring-purple-200 
                    focus:ring-opacity-50
                "
                                        />
                                        <button
                                            type="submit"
                                            className="
                    mt-4 
                    w-full 
                    py-[0.8rem] 
                    px-4 
                    bg-purple-600 
                    text-white 
                    rounded-md 
                    font-semibold 
                    hover:bg-purple-700 
                    focus:outline-none 
                    focus:bg-purple-700 
                    transition 
                    duration-300
                "
                                        >
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex flex-col gap-2 p-6">
                                <div
                                    className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                  "
                                >


                                    {/* <Button
                                        disabled={disabled}
                                        label={'Track Price'}
                                        onClick={handleSubmit}
                                    /> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Modal
