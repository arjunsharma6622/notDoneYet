import { auth } from '@/auth';
import { API_HEAD } from '@/lib/utils';
import axios from 'axios';
import React from 'react'
import DoctorCard from './DoctorCard';

const Doctors = async () => {
  const session: any = await auth();

  const doctors = await axios.get(`${API_HEAD}/user?roles=doctor`)

  return (
    <div className="md:grid md:grid-cols-4 md:items-start flex flex-col gap-4 justify-center items-center">
      {doctors?.data?.map((doctor: any) => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  )
}

export default Doctors