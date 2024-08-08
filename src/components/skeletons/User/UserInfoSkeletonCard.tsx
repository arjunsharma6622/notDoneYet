import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const UserInfoSkeletonCard = () => {
  return (
    <div className='flex flex-col gap-4 bg-white border border-gray-200 rounded-xl'>
        <Skeleton className="h-24 w-full bg-gray-200 rounded-b-none" />
        <div className='flex flex-col gap-2 px-2 pb-2'>
        <Skeleton className="h-3 w-[50%] mx-auto bg-gray-200 rounded-full" />
        <Skeleton className="h-3 w-[70%] mx-auto bg-gray-200 rounded-full" />
        <Skeleton className="mt-4 h-8 w-[100%] mx-auto bg-gray-200 rounded-full" />
        </div>
    </div>
  )
}

export default UserInfoSkeletonCard