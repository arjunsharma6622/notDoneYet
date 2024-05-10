import VenueCard from '@/components/VenueCard'
import { BASE_URL } from '@/lib/utils';
import axios from 'axios';
import React from 'react'

const Venues = async ({ venueData } : any) => {
    const allVenues = await axios
    .get(`${BASE_URL}/api/venue/user/${venueData._id}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));
  return (
    <div className="px-6 flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Venues</h2>
    </div>
    {allVenues?.map((venue: any) => (
      <VenueCard venueDetails={venue} key={venue._id} />
    ))}
  </div>  )
}

export default Venues