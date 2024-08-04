"use client"

import { API_HEAD } from '@/lib/utils'
import axiosInstance from '@/utils/axiosInstance'
import { useEffect, useState } from 'react'

const UnreadMsgsCount = () => {
    const [unreadMsgsCount, setUnreadMsgsCount] = useState(0)
    useEffect(() => {
        const fetchUnreadMsgsCount = async () => {
            try {
                const response = await axiosInstance.get(`${API_HEAD}/conversation/unreadCount/user`);
                const unreadCount = response?.data?.data?.unreadCount;
                setUnreadMsgsCount(unreadCount);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUnreadMsgsCount();
    }, [])

    return (
        <>
            {unreadMsgsCount > 0 &&
                <div className="text-white absolute font-medium -top-[7px] -right-[7px] h-4 w-4 px-1 py-1 flex text-[10px] items-center justify-center bg-red-500 rounded-full">
                    {unreadMsgsCount}
                </div>
            }
        </>

    )

}

export default UnreadMsgsCount