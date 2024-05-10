import React from 'react'
import ProfilePostCard from './ProfilePostCard'

const Activity = ({ postData }: { postData: any }) => {
  return (

    <div className="px-3 md:px-6 flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Activity</h2>
    </div>

    <div className="flex flex-col gap-2">
      {postData.map((post: any, index: number) => (
        <ProfilePostCard post={post} key={index} />
      ))}
    </div>
  </div>  )
}

export default Activity