import VenueCard from "@/components/VenueCard";
import { IconButton } from "@/components/ui/IconButton";
import { API_HEAD } from "@/lib/utils";
import { useState } from "react";
import useSWR from "swr";
import AddVenue from "../../(modals)/venue/AddVenue/AddVenue";

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
          <h2 className="text-xl font-bold">Venue Details</h2>

          <div className="flex justify-start items-center gap-4">
            {allVenues?.length === 0 && (
              <IconButton
                variant={"add"}
                onClick={() => setOpenAddVenue(true)}
              />
            )}
          </div>
        </div>
        {allVenues?.length > 0 ? (
          <VenueCard venueDetails={allVenues[0]} />
        ) : (
          <p className="text-gray-500 text-sm">No Venue Added</p>
        )}
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
    </>
  );
};

export default Venues;
