import { Button } from '@/components/ui/button'
import { MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

const UserCard = ({ user }: any) => {
  return (
    <div className='relative w-fit h-fit shadow rounded-md max-w-xs flex items-center gap-2 flex-col text-center'>
      <img src={user?.backgroundImg} alt="" className='w-full aspect-[4/1] object-cover rounded-t-md' />
      <img src={user?.image} alt="" className='absolute top-4 w-16 h-16 rounded-full object-cover' />
      <div className='flex flex-col gap-1 mt-0 p-3'>
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

      <Link href={`/${user?.role}/${user?.userName}`}>
          <Button className='w-full mt-2 rounded-full'>
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default UserCard