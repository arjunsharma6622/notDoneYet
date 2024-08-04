"use client";

import DeleteVenue from "@/app/dashboard/(modals)/venue/DeleteVenue";
import EditVenue from "@/app/dashboard/(modals)/venue/EditVenue/EditVenue";
import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";
import { BiSolidStar } from "react-icons/bi";
import { FiArrowUpRight, FiClock, FiMapPin } from "react-icons/fi";
import { IconButton } from "./ui/IconButton";

const VenueCard = ({ venueDetails, userData }: any) => {
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [openEditVenue, setOpenEditVenue] = useState(false);
  const [openDeleteVenue, setOpenDeleteVenue] = useState(false);

  return (
    <>
      <div className="shadow-md border flex flex-col gap-3 rounded-lg px-5 py-4">
        <div className="flex flex-col gap-1 border-b pb-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h1 className="text-xl  font-bold">{venueDetails.name} </h1>

                <Link
                  className="w-fit text-sm text-primary"
                  target="_blank"
                  href={`/venue/${venueDetails?.uniqueName}`}
                >
                  <span className="">View venue profile</span>
                  <FiArrowUpRight className="inline w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <IconButton
                  variant={"edit"}
                  onClick={() => setOpenEditVenue(true)}
                />
                <IconButton
                  variant={"delete"}
                  onClick={() => setOpenDeleteVenue(true)}
                />
              </div>
            </div>
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
            <Image
              key={index}
              src={image}
              width={224}
              height={176}
              alt=""
              layout="intrinsic"
              className="rounded-lg object-cover"
            />
          ))}
        </div>

      </div>
      {openEditVenue && (
        <div className="absoulte">
          <EditVenue
            venueDetails={venueDetails}
            setOpen={setOpenEditVenue}
            open={openEditVenue}
            user={userData}
          />
        </div>
      )}
      {openDeleteVenue && (
        <div className="absolute">
          <DeleteVenue
            venueDetails={venueDetails}
            setOpen={setOpenDeleteVenue}
            open={openDeleteVenue}
            user={userData}
          />
        </div>
      )}
    </>
  );
};

export default VenueCard;
