import { auth } from '@/auth';
import { API_HEAD } from '@/lib/utils';
import axios from 'axios';
import VenueCard from './VenueCard';

const Venues = async () => {
  const session: any = await auth();

  const venues = await axios.get(`${API_HEAD}/venue/`)

  return (
    <div className="md:grid md:grid-cols-4 md:items-start flex flex-col gap-4 justify-center items-center">
      {venues?.data?.map((venue: any) => (
        <VenueCard key={venue._id} venue={venue} />
      ))}
    </div>
  )
}

export default Venues