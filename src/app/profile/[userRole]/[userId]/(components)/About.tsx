import React from 'react'

const About = ({userData} : any) => {
  return (
    <div className="px-3 md:px-6 flex items-start justify-between">
    <div className="flex flex-col gap-1">
      <h2 className="text-xl font-bold">About</h2>
      <p>{userData.about}</p>
    </div>
  </div>  )
}

export default About