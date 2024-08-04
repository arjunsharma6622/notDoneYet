import { API_HEAD } from '@/lib/utils';
import axios from 'axios';
import DoctorCard from './DoctorCard';

const Doctors = async () => {

  const doctors = await axios.get(`${API_HEAD}/user?roles=doctor`).then((res) => res.data).catch((err) => console.error("Error", err));

  return (
    <div className="md:grid md:grid-cols-4 md:items-start flex flex-col gap-4 justify-center items-center">
      {doctors?.map((doctor: any) => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  )
}

export default Doctors