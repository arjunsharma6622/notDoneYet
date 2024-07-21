import AthleteExperienceCard from "@/components/AtheleteExperienceCard";
import DoctorExperienceCard from "@/components/DoctorExperienceCard";
import { IconButton } from "@/components/ui/IconButton";
import React, { useState } from "react";
import AddAthleteExperience from "../(modals)/athlete/AddAthleteExperience";
import EditAthleteExperience from "../(modals)/athlete/EditAthleteExperience";
import AddDoctorExperience from "../(modals)/doctor/AddDoctorExperience";
import EditDoctorExperience from "../(modals)/doctor/EditDoctorExperience";

const Experience = ({ userData }: { userData: any }) => {
  const [openExperienceAdd, setOpenExperienceAdd] = useState(false);
  const [openExperienceEdit, setOpenExperienceEdit] = useState(false);

  const sortedExperience = userData.experience?.sort((a: any, b: any) => {
    const dateA = a.endDate ? new Date(a.endDate).getTime() : new Date(a.date).getTime();
    const dateB = b.endDate ? new Date(b.endDate).getTime() : new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-4 border-t">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Experience</h2>

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
          {sortedExperience?.map((experience: any, index: number) => {
            return (
              <React.Fragment key={index}>
                {userData?.role === "athlete" && (
                  <AthleteExperienceCard experience={experience} />
                )}
                {userData?.role === "doctor" && (
                  <DoctorExperienceCard experience={experience} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {openExperienceAdd && (
        <div className="absolute">
          {userData?.role === "athlete" && (
            <AddAthleteExperience
              user={userData}
              open={openExperienceAdd}
              setOpen={setOpenExperienceAdd}
            />
          )}
          {userData?.role === "doctor" && (
            <AddDoctorExperience
              user={userData}
              open={openExperienceAdd}
              setOpen={setOpenExperienceAdd}
            />
          )}
        </div>
      )}

      {openExperienceEdit && (
        <div className="absolute">
          {userData?.role === "athlete" && (
            <EditAthleteExperience
              user={userData}
              open={openExperienceEdit}
              setOpen={setOpenExperienceEdit}
            />
          )}
          {userData?.role === "doctor" && (
            <EditDoctorExperience
              user={userData}
              open={openExperienceEdit}
              setOpen={setOpenExperienceEdit}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Experience;
