import { auth } from '@/auth';
import { API_HEAD } from '@/lib/utils';
import axios from 'axios';
import VenueCard from './VenueCard';

const Venues = async () => {
    const session: any = await auth();

    const venues = await axios.get(`${API_HEAD}/venue/`)

    return (
    <div>
        {venues?.data?.map((venue: any) => (
          <VenueCard key={venue._id} venue={venue} />
        ))}
    </div>
  )
}

export default Venues