"use client";

import { useState } from "react";
import { BiSolidStar } from "react-icons/bi";
import { FiClock, FiMapPin } from "react-icons/fi";
import VenueBookingModal from "./VenueBookingModal";

const VenueCard = ({ venueDetails }: any) => {
  const [openBookingModal, setOpenBookingModal] = useState(false);

  return (
    <div className="shadow-md border flex flex-col gap-3 rounded-lg px-5 py-4">
      <div className="flex flex-col gap-1 border-b pb-2">
        <div className="flex flex-col gap-0">
          <h1 className="text-xl  font-bold">{venueDetails.name} </h1>
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-center gap-1">
                  <BiSolidStar className="w-4 h-4 text-orange-500" />
                </div>
              ))}
          </div>
        </div>

        <div className="flex text-sm items-center gap-2">
          <FiMapPin className="w-4 h-4" />
          <span>{`${venueDetails.location?.address}, ${venueDetails.location?.city}, ${venueDetails.location?.state}, ${venueDetails.location?.country}, ${venueDetails.location?.zipCode}`}</span>
        </div>

        <div className="flex text-sm items-center gap-2">
          <FiClock className="w-4 h-4" />
          <div className="flex items-center gap-1">
            <span className="">{venueDetails.timing?.startTime}</span>
            <span className="">-</span>
            <span className="">{venueDetails.timing?.endTime}</span>
          </div>
        </div>
      </div>

      <p className="text-sm mt-1">{venueDetails.description}</p>

      <div className="overflow-x-scroll justify-start items-center gap-4 flex w-[calc(100%-10px)]">
        {venueDetails.images.map((image: any, index: number) => (
          <img
            key={index}
            src={image}
            className="rounded-lg w-56 h-44 object-cover"
          />
        ))}
      </div>

      <div className="flex gap-6 items-center justify-end w-full border-t pt-3">
        <div>
          <img src="/images/googleMaps.png" alt="" className="w-8 h-8" />
        </div>
        <button
          onClick={() => setOpenBookingModal(true)}
          className="bg-primary rounded-md text-sm px-5 py-2 text-white"
        >
          Book Now
        </button>
      </div>

      {
        <div className="absolut">
          <VenueBookingModal
            venueDetails={venueDetails}
            setOpenBookingModal={setOpenBookingModal}
            openBookingModal={openBookingModal}
          />
        </div>
      }
    </div>
  );
};

export default VenueCard;
