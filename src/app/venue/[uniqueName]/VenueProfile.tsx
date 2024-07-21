import RatingForm from "@/components/client/RatingForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiCheckCircle, FiClock, FiMail, FiMessageSquare, FiPhoneCall } from "react-icons/fi";
import HeadActionOptions from "./(components)/HeadActionOptions";
import SportCard from "./(components)/SportCard";
import VenueRatingHeader from "./(components)/VenueRatingHeader";

const VenueProfile = ({ venueData, session }: any) => {
  const address = `${venueData?.location?.address}, ${venueData?.location?.city}, ${venueData?.location?.state}, ${venueData?.location?.country}, ${venueData?.location?.zipCode}`
  return (
    <div className="flex items-start gap-4">
      <div className="flex-[8] flex w-full p-4 border rounded-md">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">{venueData?.name}</h1>
            <VenueRatingHeader />
            <HeadActionOptions userData={venueData} session={session} />

            <p className=" text-sm">{venueData?.description}</p>
          </div>

<div className="flex flex-col gap-2">
<h1 className="text-xl font-semibold">Sports Available</h1>
          <div className="grid grid-cols-3 gap-4">
            {venueData?.sports?.map((sport: any, index: number) => (
<SportCard sport={sport} key={index} />
            ))}
          </div>
          </div>

<div className="flex flex-col gap-2">
<h1 className="text-xl font-semibold">Amenities</h1>
          <div className="grid grid-cols-5 gap-4 items-center justify-center">
            {venueData?.amenities.map((amenity: any, index: number) => (
              <div
                key={index}
                className={`relative flex items-center gap-2 flex-col bg-gray-50 text-black rounded-md p-2 py-4  `}
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


          {/* <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Ratings and Reviews</h1>
          </div> */}


        </div>
      </div>

      <div className="flex-[4] flex w-full flex-col gap-6">

      <div className="w-full flex flex-col gap-2 p-4 border rounded-md">
        <h1 className="text-xl font-semibold">Contact</h1>

        <div className="flex items-center gap-4">

          <Link href={`tel:${venueData.number}`} className="flex items-center gap-3 w-fit h-fit px-4 py-2 rounded-full bg-blue-100 text-blue-500">
            <FiPhoneCall className="" />
            <span className="text-sm">Call</span>
          </Link>

          <Link href={`sms:${venueData.number}`} className="flex items-center gap-3 w-fit h-fit px-4 py-2 rounded-full bg-blue-100 text-blue-500">
            <FiMessageSquare className="" />
            <span className="text-sm">Quick chat</span>
          </Link>

          <Link href={`mailto:${venueData.email}`} className="flex items-center gap-3 w-fit h-fit px-4 py-2 rounded-full bg-blue-100 text-blue-500">
            <FiMail className="" />
            <span className="text-sm">Email</span>
          </Link>
          

        </div>

        <div>
          <p className="text-sm text-gray-500">We are available from </p>
          <div className="flex items-center gap-2">
            <FiCalendar className="inline" />
          {venueData.sports[0].timing?.startDay} - {venueData.sports[0].timing?.endDay}
          </div>

          <div className="flex items-center gap-2">
            <FiClock className="inline" />
          {venueData.sports[0].timing?.startTime} - {venueData.sports[0].timing?.endTime}
          </div>
        </div>


<div>
<p className="text-sm text-gray-500">Reach out to use on social media!</p>
      <div className="flex items-center gap-4">
            {venueData?.socialLinks?.map((social: any, index: number) => (
              <Link key={index} href={social.link}>
                <img
                  className="w-6"
                  src={`/images/social/${social.name}.png`}
                  alt=""
                />
              </Link>
            ))}
          </div>
        </div>
        </div>


        




        <div className="w-full flex flex-col p-4 border rounded-md">

          <h1 className="text-xl font-semibold">Address</h1>
          


            <p className="text-sm mb-2">{`${venueData.location.address}, ${venueData.location.city}, ${venueData.location.state}, ${venueData.location.country}, ${venueData.location.zipCode}`}</p>

          <iframe
            loading="lazy"
            allowFullScreen
            className="w-full h-64 rounded-xl focus:outline-none"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}
    &q=${address}`}
          ></iframe>





        </div>



        <RatingForm />


        {/* <Carousel>
            <CarouselContent>
              {venueData?.images?.map((image: any) => (
                <CarouselItem key={image}>
                  <img
                    src={image}
                    alt="image"
                    className="w-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {venueData?.images?.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel> */}




      </div>
    </div>
  );
};

export default VenueProfile;
