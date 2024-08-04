import axiosInstance from '@/utils/axiosInstance';
import DoctorCard from './DoctorCard';

const Doctors = async () => {

  const doctors = await axiosInstance.get(`/user?roles=doctor`)

  return (
    <div className="md:grid md:grid-cols-4 md:items-start flex flex-col gap-4 justify-center items-center">
      {doctors?.data?.map((doctor: any) => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  )
}

export default Doctors