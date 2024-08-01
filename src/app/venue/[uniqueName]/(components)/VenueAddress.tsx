import React from 'react'

const VenueAddress = ({venueData}: any) => {

    const address = `${venueData?.location?.address}, ${venueData?.location?.city}, ${venueData?.location?.state}, ${venueData?.location?.country}, ${venueData?.location?.zipCode}`

    return (
        <div className="w-full flex flex-col p-4 border rounded-md">
            <h1 className="text-xl font-semibold">Address</h1>
            <p className="text-sm mb-2">{`${venueData?.location?.address}, ${venueData?.location?.city}, ${venueData.location.state}, ${venueData?.location?.country}, ${venueData?.location?.zipCode}`}</p>
            <iframe
                loading="lazy"
                allowFullScreen
                className="w-full h-64 rounded-xl focus:outline-none"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${address}`}
            ></iframe>
        </div>
    )
}

export default VenueAddress