import { MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const UserCard = ({ user }: any) => {
  return (
    <div className='relative w-full h-fit shadow rounded-md max-w-xs flex items-center gap-2 flex-col text-center'>
      <Image width={400} height={400} src={user?.backgroundImg} alt="" className='w-full aspect-[4/1] object-cover rounded-t-md' />
      <Image width={100} height={100}  src={user?.image} alt="x" className='absolute top-4 w-16 h-16 rounded-full object-cover' />
      <div className='w-full flex flex-col gap-1 mt-0 p-3'>
        <h1 className='text-xl font-bold'>{user?.name}</h1>
        {user?.bio &&
          <p className='text-gray-600 text-xs truncatedText1'>{user?.bio}</p>
        }
        {user?.phone &&
          <span className='text-xs'><Phone className='w-4 h-4 inline' /> {user?.phone}</span>
        }
        {user?.address &&
          <span className='text-xs'><MapPin className='w-4 h-4 inline' /> {user?.address?.city}, {user?.address?.state}</span>
        }

      <Link prefetch={false} href={`/${user?.role}/${user?.userName}`} className='text-sm px-4 py-1 bg-blue-600 rounded-full text-white w-full'>
            View
        </Link>
      </div>
    </div>
  )
}

export default UserCard