import { Button } from '@/components/ui/button'
import { MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DoctorCard = ({doctor} : any) => {
  return (
    <div className='relative w-fit shadow rounded-md max-w-xs flex items-center gap-2 flex-col text-center'>
        <img src={doctor?.backgroundImg} alt="" className='w-full aspect-[4/1] object-cover rounded-t-md' />
        <img src={doctor?.image} alt="" className='absolute top-3 w-24 h-24 rounded-full object-cover' />
        <div className='flex flex-col gap-1 mt-4 p-3'>
            <h1 className='text-xl font-bold'>{doctor?.name}</h1>
            <p className='text-gray-600 text-xs truncatedText1'>{doctor?.bio}</p>
            <span className='text-xs'><Phone className='w-4 h-4 inline'/> {doctor?.phone}</span>
            <span className='text-xs'><MapPin className='w-4 h-4 inline'/> {doctor?.address?.city}, {doctor?.address?.state}</span>

            <Link href={`/doctor/${doctor?.userName}`}>
            <Button className='w-full mt-2 rounded-full'>
                View Profile
            </Button>
            </Link>
        </div>
    </div>
  )
}

export default DoctorCard