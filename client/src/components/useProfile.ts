import { UserData } from './../../@types/index';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/components/AppContext';
import axiosInstance from '../axios';

interface returnTypes {
    UserData: UserData | null;
    isLoading: boolean | null;
}

export default function (): returnTypes {
    const [isLoading, setIsLoading] = useState<boolean | null>(true)
    const [UserData, setUserData] = useState<UserData | null>(null)
    const { accessToken } = useAuthContext();

    const fetchData = async () => {
        try {
            const { data } = await axiosInstance.get('api/auth/user', {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return data;
        } catch (error: any) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };

    const memoizedFetchData = useMemo(() => fetchData, [accessToken]);

    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            if (accessToken) {
                const data = await memoizedFetchData();
                setUserData(data);
            }
            setIsLoading(false);
        };

        fetchDataAndUpdateState();
    }, [accessToken, memoizedFetchData]);

    return { UserData, isLoading }
}

