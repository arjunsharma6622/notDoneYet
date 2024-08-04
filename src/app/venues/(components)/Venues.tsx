import axiosInstance from '@/utils/axiosInstance';
import VenueCard from './VenueCard';

const Venues = async () => {

  const venues = await axiosInstance.get(`/venue/`)
  
  return (
    <div className="md:grid md:grid-cols-4 md:items-start flex flex-col gap-4 justify-center items-center">
      {venues?.data?.map((venue: any) => (
        <VenueCard key={venue._id} venue={venue} />
      ))}
    </div>
  )
}

export default Venues