import useAuth from '@/context/useAuth';
import axiosInstance from '@/utils/axiosInstance';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

const NavAction = () => {
    const {auth, setAuth} = useAuth();
    const {user : authenticatedUser} = auth;

    const handleLogout = async () => {
        try{
            const response = await axiosInstance.post('/auth/logout')
            if (response.status === 200) {
                setAuth({
                    isAuthenticated: false,
                    user : null
                })
            }
            toast.success(response.data.data.message)
        }
        catch (err : any) {
            toast.error(err.response.data.message)
        }
    }

    return (
        <div className="flex-[1] flex justify-end md:mb-0">
            {authenticatedUser ? (
                <div className="relative w-fit flex-row flex items-center gap-6">
                    <Link href={"/dashboard"} className="flex items-center gap-2 text-blue-600">
                        <Image
                            src={authenticatedUser && (authenticatedUser?.image as string)}
                            alt=""
                            width={32}
                            height={32}
                            layout="intrinsic"
                            className="rounded-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                        <span className=' text-sm'>
                            Me
                        </span>
                    </Link>

                    <button onClick={handleLogout} className='flex items-center gap-2 cursor-pointer w-fit focus:outline-offset-0 ring-0 text-red-600 bg-red-100 rounded-full p-[6px] md:p-2 md:px-4'>
                        <span className='hidden md:block text-xs'>Logout</span>
                        <LogOut strokeWidth={1.5} className='w-5 h-5 ' />
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <Link href="/login" className='hover:opacity-90 px-[14px] md:px-4 py-2 bg-blue-600 rounded-full text-white text-xs md:text-sm'>Login</Link>
                    <Link href="/signup" className='hover:opacity-90 px-[14px] md:px-4 py-2 bg-blue-600 rounded-full text-white text-xs md:text-sm'>Signup</Link>
                </div>
            )}
        </div>
    )
}

export default NavAction