import React from 'react'

const Heading = ({heading, subline} : {heading: string, subline: string}) => {
  return (
    <div className="mx-auto flex items-center flex-col gap-1 md:gap-2">
    <h2 className="text-[24px] md:text-4xl font-bold text-center text-black">
      {heading}
    </h2>
    <p className="text-center text-gray-700 max-w-2xl mx-auto text-xs md:text-base">
      {subline}
    </p>
    </div>  )
}

export default Heading