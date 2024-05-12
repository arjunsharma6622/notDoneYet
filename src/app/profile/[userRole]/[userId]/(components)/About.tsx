import React from 'react'

const About = ({userData} : any) => {
  return (
    <div className="flex items-start justify-between border-t py-2 px-3 md:px-6 md:py-4">
    <div className="flex flex-col gap-1">
      <h2 className="text-xl font-bold">About</h2>
      <p>{userData.about}</p>
    </div>
  </div>  )
}

export default About