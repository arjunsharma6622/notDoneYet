import { Button } from '@/components/ui/button'
import { ArrowUpRight, MapPin, Navigation, Phone, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const VenueCard = ({ venue }: any) => {
  const sportsAvailable = venue?.sports?.map((sport: any) => sport.name)
  const venueAddress = `${venue?.location?.address || ""}, ${venue?.location?.landmark || ""}, ${venue?.location?.city || ""}, ${venue?.location?.state || ""}, ${venue?.location?.country || ""}, ${venue?.location?.zipCode || ""}`
  return (
    <div className='relative w-fit shadow rounded-md max-w-xs flex items-center gap-2 flex-col text-center'>
      <img src={venue?.images[0]} alt="" className='w-full aspect-[3/1] object-cover rounded-t-md' />
      <div className='w-full flex flex-col gap-1 p-3 pt-1'>
        <h1 className='text-xl font-bold'>{venue?.name}</h1>
        <span className='text-xs'><Phone className='w-4 h-4 inline' /> {venue?.phone}</span>
        <span className='text-xs'><MapPin className='w-4 h-4 inline' />{venue?.location?.city}, {venue?.location?.state}, {venue?.location?.country}</span>
        <div className='flex items-center justify-center gap-2'>
          {sportsAvailable?.slice(0, 3)?.map((sport: string) => (
            <span key={sport} className='text-xs px-3 py-1 rounded-full bg-gray-200'>{sport}</span>
          ))}
        </div>

        <div className='w-full flex items-center gap-2'>
        <Link href={`/venue/${venue?.uniqueName}`} className='w-full'>
          <Button className='w-full mt-2 rounded-full'>
            View Profile
          </Button>
        </Link>
        <Link href={`https://www.google.com/maps/search/?api=1&query=${venueAddress}`} className='w-fit'>
          <Button className='w-fit mt-2 rounded-full'>
            <Navigation className='inline mr-1 w-4 h-4'/>
            Directions
          </Button>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default VenueCard