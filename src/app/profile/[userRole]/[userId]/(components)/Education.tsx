import DoctorEducationCard from '@/components/DoctorEducationCard'
import React from 'react'

const Education = ({ userData }: { userData: any }) => {
  return (
    <div className="px-6 mt-10 flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Experience</h2>
    </div>

    <div className="flex flex-col gap-2">
      {userData.education?.map((education: any, index: number) => (
        <DoctorEducationCard key={index} educationDetails={education} />
      ))}
    </div>
  </div>  )
}

export default Education