"use client"
import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '@/components/AppContext';
import axiosInstance from '@/axios';
import Charts from '@/components/Charts';
import AnalysisComponent from '@/components/AnalysisComponent';
import { trackProducts, UserData } from '../../../@types';
import { useRouter } from 'next/navigation';
import useProfile from '../../components/useProfile';

const Page = () => {
    const { accessToken } = useAuthContext();
    const { UserData: userData, isLoading } = useProfile();
    const router = useRouter();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!accessToken) {
        router.push('/login');
        return null;
    }

    if (!userData) {
        return <p>Error fetching user data</p>;
    }

    return (
        <div>
            <h1 className='text-4xl text-purple-600 p-12'>Analyse Your Products </h1>
            {userData.tracks && userData.tracks.map((track, idx) => (
                <AnalysisComponent key={idx} idx={idx} tracks={track} />
            ))}
            <h1>Welcome, {userData.username}</h1>
            <p>Email: {userData.email}</p>
        </div>
    );
}

export default Page;