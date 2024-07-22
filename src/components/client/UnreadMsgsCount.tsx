import { API_HEAD } from '@/lib/utils'
import axios from 'axios'
import { useEffect, useState } from 'react'

const UnreadMsgsCount = ({ userId }: { userId: string }) => {
    const [unreadMsgsCount, setUnreadMsgsCount] = useState(0)
    useEffect(() => {
        const fetchUnreadMsgsCount = async () => {
            try {
                const response = await axios.get(`${API_HEAD}/conversation/unreadCount/user/${userId}`);
                setUnreadMsgsCount(response.data.unreadCount);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUnreadMsgsCount();
    }, [userId])

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