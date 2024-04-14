"use client"

import React, { FC } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}

const Input: FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    register,
    required,
    errors,
}) => {
    return (
        <div className="w-full relative my-2">
            <input
                id={id}
                disabled={disabled}
                {...register(id, {
                    ...(id === 'email'
                        ? {
                            required: 'Email is required',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            },
                        }
                        : id === 'password'
                            ? {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long',
                                },
                                validate: (value) => {
                                    return (
                                        [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                                            pattern.test(value)
                                        ) || 'Password must include lowercase, uppercase, number, and special characters'
                                    );
                                },
                            }
                            : required && { required: 'This field is required' }
                    )
                })}
                type={type}
                className={`
            peer
            w-full
            pt-6 pb-2
            font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
            ${formatPrice ? 'pl-9' : 'pl-4'}
            ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
            focus:border-purple-500
                `}
            />
            <label
                // classname -translate-y-3
                className={`
          absolute 
          text-base
          duration-150 
          transform 
          -translate-y-5
          top-5
          z-10 
          origin-[0] 
          bg-white
          px-1
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-8
          peer-focus: border-purple-500
          ${errors[id] ? 'text-rose-500' : 'text-[#B48AFF]'}
        `}
            // by using peer class in input we can control actions of label based on input state
            // peer placeholder show ho rha ha to scale 100 
            >
                {label}
            </label>

            {errors[id] && (
                <span className="text-rose-500 text-sm ">
                    <span>{errors[id]?.message as string} </span>
                </span>
            )}
        </div>
    )
}

export default Input
