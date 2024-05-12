import VenueCard from "@/components/VenueCard";
import { useState } from "react";
import { FiEdit3, FiPlus } from "react-icons/fi";
import useSWR from "swr";
import AddVenue from "../../(modals)/venue/AddVenue";
import EditVenue from "../../(modals)/venue/EditVenue";
import { API_HEAD } from "@/lib/utils";

const Venues = ({ userData }: any) => {
  const [openAddVenue, setOpenAddVenue] = useState(false);
  const [openEditVenue, setOpenEditVenue] = useState(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: allVenues,
    error,
    isLoading,
  } = useSWR(`${API_HEAD}/venue/user/${userData?._id}`, fetcher);

  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Venues</h2>

          <div className="flex justify-start items-center gap-4">
            <FiPlus
              className="cursor-pointer h-6 w-6 text-gray-600"
              onClick={() => setOpenAddVenue(true)}
            />
            <FiEdit3
              className="cursor-pointer h-6 w-6 text-gray-600"
              onClick={() => setOpenEditVenue(true)}
            />
          </div>
        </div>
        {allVenues?.map((venue: any) => (
          <VenueCard venueDetails={venue} key={venue._id} />
        ))}
      </div>

      {openAddVenue && (
        <div className="absolute">
          <AddVenue
            user={userData}
            open={openAddVenue}
            setOpen={setOpenAddVenue}
          />
        </div>
      )}

      {openEditVenue && (
        <div className="absolute">
          <EditVenue
            user={userData}
            open={openEditVenue}
            setOpen={setOpenEditVenue}
            allVenues={allVenues}
          />
        </div>
      )}
    </>
  );
};

export default Venues;
