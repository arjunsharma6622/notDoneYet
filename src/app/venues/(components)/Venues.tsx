import { API_HEAD } from '@/lib/utils';
import axios from 'axios';
import VenueCard from './VenueCard';

const Venues = async () => {

  const venues = await axios.get(`${API_HEAD}/venue/`).then((res) => res.data).catch((err) => console.error("Error", err));
  
  return (
    <div className="md:grid md:grid-cols-4 md:items-start flex flex-col gap-4 justify-center items-center">
      {venues?.map((venue: any) => (
        <VenueCard key={venue._id} venue={venue} />
      ))}
    </div>
  )
}

export default Venues