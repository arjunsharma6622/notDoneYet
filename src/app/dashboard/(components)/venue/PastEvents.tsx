import PastEventCard from "@/components/PastEventCard";
import { IconButton } from "@/components/ui/IconButton";
import { useState } from "react";

const PastEvents = ({ userData }: { userData: any }) => {
  const [openExperienceAdd, setOpenExperienceAdd] = useState(false);
  const [openExperienceEdit, setOpenExperienceEdit] = useState(false);

  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Past Events</h2>

          <div className="flex justify-start items-center gap-4">
            <IconButton
              variant={"add"}
              onClick={() => setOpenExperienceAdd(true)}
            />
            <IconButton
              variant={"edit"}
              onClick={() => setOpenExperienceEdit(true)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {userData.events?.map((event: any, index: number) => (
            <PastEventCard key={index} eventDetails={event} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PastEvents;
