import React from 'react'
import VenueRatingHeader from './VenueRatingHeader'
import HeadActionOptions from './HeadActionOptions'

const VenueHeader = ({ venueData }: any) => {
  return (
    <div className="flex flex-col gap-1 md:gap-2">
    <h1 className="text-3xl md:text-4xl font-bold">{venueData?.name}</h1>
    <VenueRatingHeader />
    <HeadActionOptions userData={venueData} />

    <p className="text-xs md:text-sm text-justify mt-1 md:mt-0">{venueData?.description}</p>
  </div>  
)}

export default VenueHeader