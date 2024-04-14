import axiosInstance from '@/axios';

interface AuthData {
    access_token: string;
}

export default async function getAuth(accessToken: string | null): Promise<AuthData | null> {
    try {
        const response = await axiosInstance.get(`api/auth/get-token`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching auth token:', error);
        return null;
    }
}
