import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HeadActionOptions from "./(components)/HeadActionOptions";
import { amenities } from "@/lib/utils";
import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";
import Link from "next/link";

const VenueProfile = ({ venueData, session }: any) => {
  return (
    <div className="flex items-start gap-4">

<div className="flex-[9] flex w-full">
    <div className="flex flex-col gap-4">
        <div>
        <h1 className="text-4xl font-bold">{venueData.name}</h1>
        <HeadActionOptions userData={venueData} session={session}/>

        </div>
      <Carousel>
        <CarouselContent>
          {venueData.images?.map((image: any) => (
            <CarouselItem key={image}
            >
              <img
                src={image}
                alt="image"
                className="w-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {venueData.images?.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>

      <div className="grid grid-cols-2 gap-4">
        {venueData.sports?.map((sport : any, index : number) => (
          <div key={index} className="border flex flex-col gap-2 rounded-lg px-4 py-1">
            <span className="">{sport.name}</span>
            <Carousel>
        <CarouselContent>
          {sport.images?.map((image: any) => (
            <CarouselItem key={image}
            >
              <img
                src={image}
                alt="image"
                className="w-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {sport.images?.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>

      <span>Rs.{sport.price} per hour</span>

<div className="flex flex-col gap-1">
      <span>Timings</span>
      <span>{sport.timing.startDay} to {sport.timing.endDay}</span>
      <span>{sport.timing.startTime} to {sport.timing.endTime}</span>
      </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4 items-center justify-center">
        {venueData?.amenities.map((amenity: any, index: number) => (
                    <div
                    key={index}
                    className={`relative flex items-center gap-2 flex-col bg-gray-100 text-black rounded-md p-2 py-4  `}

                  >
                    <Image
                      src={`/images/amenities/${amenity.icon}`}
                      alt={amenity.name}
                      width={44}
                      height={44}
                    />
                    <FiCheckCircle className="text-green-500 absolute top-2 right-2" />
                    <label className="text-sm">{amenity.name}</label>
                  </div>
        ))}
      </div>
      </div>
      </div>



<div className="flex-[4] flex w-full">

<div className="flex items-center gap-4">
    {venueData?.socialLinks?.map((social: any, index: number) => (
      <Link key={index} href={social.link}>
      <img className="w-7" src={`/images/social/${social.name}.png`} alt="" />
      </Link>
    ))}
</div>


<div className="flex flex-col gap-2">
      <p>{venueData.location.address}</p>
      <p>{venueData.location.city}</p>
      <p>{venueData.location.state}</p>
      <p>{venueData.location.country}</p>
      <p>{venueData.location.zipCode}</p>
      <p>{venueData.name}</p>
      <p>{venueData.name}</p>
      </div>
      </div>
    </div>
  );
};

export default VenueProfile;
