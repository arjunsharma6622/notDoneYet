import PastEventCard from "@/components/PastEventCard";
import React, { useState } from "react";
import { FiEdit3, FiPlus } from "react-icons/fi";

const PastEvents = ({ userData }: { userData: any }) => {
  const [openExperienceAdd, setOpenExperienceAdd] = useState(false);
  const [openExperienceEdit, setOpenExperienceEdit] = useState(false);

  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Past Events</h2>

          <div className="flex justify-start items-center gap-4">
            <FiPlus
              className="cursor-pointer h-6 w-6 text-gray-600"
              onClick={() => setOpenExperienceAdd(true)}
            />
            <FiEdit3
              className="cursor-pointer h-6 w-6 text-gray-600"
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
