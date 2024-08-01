import { CircleCheckBig } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const VenueAmenities = ({venueData} : any) => {
  return (
    <div className="flex flex-col gap-2">
    <h1 className="text-xl font-semibold">Amenities</h1>
    <div className="grid md:grid-cols-5 grid-cols-2 gap-2 md:gap-4 items-center justify-center">
      {venueData?.amenities.map((amenity: any, index: number) => (
        <div
          key={index}
          className={`relative flex items-center gap-2 flex-col bg-green-50 border border-green-500 text-black rounded-md p-2 py-4  `}
        >
          <Image
            src={`/images/amenities/${amenity.icon}`}
            alt={amenity.name}
            width={44}
            height={44}
            className='w-10 h-10'
          />
          <CircleCheckBig className="text-green-500 absolute w-5 h-5 top-2 right-2" />
          <label className="text-xs md:text-sm">{amenity.name}</label>
        </div>
      ))}
    </div>
  </div>  )
}

export default VenueAmenities