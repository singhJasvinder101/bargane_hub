"use server"
import axiosInstance from "@/axios";
import { useAuthContext } from "@/components/AppContext";

export const Trending = async () => {
    try {
        const { data } = await axiosInstance.get('api/scrape/get/bestsellers');
        // console.log(data)
        return data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching data');
    }
}

export const scrapProduct = async (url: string) => {
    try {
        const { data } = await axiosInstance.post('api/scrape/create', {
            url
        });
        return data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching data');
    }
}


export const getScrapById = async (id: string) => {
    try {
        const { data } = await axiosInstance.get(`api/scrape/${id}`);
        return data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching data');
    }
}


export const subscribeUser = async (email: string, id: number) => {
    try {
        const { data } = await axiosInstance.get(`api/scrape/add/useremail?product_id=${id}&user_email=${email}`);
        return data
    } catch (error: any) {
        throw new Error(error);
    }
}
