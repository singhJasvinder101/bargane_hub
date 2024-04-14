"use client"

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/Input';
import Image from 'next/image';
import Header from '@/components/Heading';
import Button from '@/components/Button';
import { useAuthContext } from '@/components/AppContext';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setAccessToken } = useAuthContext();

  const handleLogin: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`api/auth/login`, { ...data });
      if (response.status === 200) {
        setAccessToken(response.data.access_token);
        localStorage.setItem('access_token', response.data.access_token);
        router.push('/dashboard');
      } else {
        console.error('Login failed:', response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  return (
    <div className='flex bg-gray-100' >
      <div className="login-img col-8">
        <Image
          src="/assets/v2-login-light.png"
          alt="login"
          height={900}
          width={700}
          objectFit="contain"
          className='mx-auto py-12'
        />
      </div>
      <div className="login-container col-4 p-5 bg-white flex flex-col">
        <Header title='Welcome To Bargan Hub!👋🏻' subtitle="Let's Bargan together" />
        <br />
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required={true}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required={true}
        />
        <Button label='Login' onClick={handleSubmit(handleLogin)} />
      </div>
    </div>
  );
};

export default LoginPage;
