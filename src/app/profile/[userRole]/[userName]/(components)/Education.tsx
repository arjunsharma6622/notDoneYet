import DoctorEducationCard from '@/components/DoctorEducationCard'
import React from 'react'

const Education = ({ userData }: { userData: any }) => {
  return (
    <div className="flex flex-col gap-4 border-t py-2 px-3 md:px-6 md:py-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Education</h2>
    </div>

    <div className="flex flex-col gap-2">
      {userData.education?.map((education: any, index: number) => (
        <DoctorEducationCard key={index} educationDetails={education} />
      ))}
    </div>
  </div>  )
}

export default Education