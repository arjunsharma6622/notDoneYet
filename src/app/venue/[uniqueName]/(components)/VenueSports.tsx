import React from 'react'
import SportCard from './SportCard'

const VenueSports = ({ venueData }: any) => {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Sports Available</h1>
            <div className="grid md:grid-cols-3 gap-4">
                {venueData?.sports?.map((sport: any, index: number) => (
                    <SportCard sport={sport} key={index} />
                ))}
            </div>
        </div>
)}

export default VenueSports