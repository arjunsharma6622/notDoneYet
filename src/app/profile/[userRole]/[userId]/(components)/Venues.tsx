import VenueCard from '@/components/VenueCard';
import { API_HEAD } from '@/lib/utils';
import axios from 'axios';

const Venues = async ({ venueData } : any) => {
    const allVenues = await axios
    .get(`${API_HEAD}/venue/user/${venueData._id}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));

  return (
    <div className="flex flex-col gap-4 border-t py-2 px-3 md:px-6 md:py-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Venues</h2>
    </div>
    {allVenues?.map((venue: any) => (
      <VenueCard venueDetails={venue} key={venue._id} />
    ))}
  </div>  )
}

export default Venues