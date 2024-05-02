import PastEventCard from "@/components/PastEventCard";
import VenueCard from "@/components/VenueCard";
import { BASE_URL } from "@/lib/utils";
import axios from "axios";
import { GrMapLocation } from "react-icons/gr";


const VenueOwnerProfile = async ({venueData} : any) => {

    const allVenues = await axios.get(`${BASE_URL}/api/venue/user/${venueData._id}`).then((res) => res.data).catch((err) => console.error("Error", err))


  return (
    <div>
      <div className="flex flex-col rounded-md border">
        <div className="relative">
          <img
            src={
              "https://www.fr.com/images/demo/fish-richardson-header-default.png"
            }
            referrerPolicy="no-referrer"
            alt=""
            className="w-full object-cover aspect-[4/1] rounded-tr-md rounded-tl-md"
          />
          <img
            src={
              venueData.profileImg ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            referrerPolicy="no-referrer"
            alt=""
            className="absolute left-6 -bottom-10 border-white border-8 w-44 h-44 object-cover rounded-full"
          />

        </div>

        <div className="px-6 mt-10 flex flex-col">
        <span className="text-xs">Venues</span>

          <div className="flex justify-between items-center">
            
            <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">{venueData.name}</h1>
            <GrMapLocation className="cursor-pointer h-6 w-6" />
            </div>
          </div>


          <h1>{venueData.bio}</h1>
        </div>

        <div className="px-6 mt-10 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Venues</h2>

          </div>
          {allVenues?.map((venue : any) => (
            <VenueCard venueDetails={venue} key={venue._id}/>
          ))}
          </div>


        <div className="px-6 mt-10 flex flex-col gap-2">
          <div className="flex justify-between items-center gap-1">
            <h2 className="text-xl font-bold">Posts</h2>
          </div>

          
        </div>

        <div className="px-6 mt-10 flex flex-col gap-2">
          <div className="flex justify-between items-center gap-1">
            <h2 className="text-xl font-bold">About</h2>
          </div>

          <p>{venueData.about}</p>
        </div>

        <div className="px-6 mt-10 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Previous Events</h2>

          </div>

          <div className="flex flex-col gap-2">
            {venueData.events?.map((event : any, index : number) => (
              <PastEventCard key={index} eventDetails={event}/>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default VenueOwnerProfile;
