import AthleteExperienceCard from "@/components/AtheleteExperienceCard";
import DoctorExperienceCard from "@/components/DoctorExperienceCard";
import React, { useState } from "react";
import { FiEdit3, FiPlus } from "react-icons/fi";
import AddAthleteExperience from "../(modals)/athlete/AddAthleteExperience";
import EditAthleteExperience from "../(modals)/athlete/EditAthleteExperience";
import AddDoctorExperience from "../(modals)/doctor/AddDoctorExperience";
import EditDoctorExperience from "../(modals)/doctor/EditDoctorExperience";

const Experience = ({ userData }: { userData: any }) => {
  const [openExperienceAdd, setOpenExperienceAdd] = useState(false);
  const [openExperienceEdit, setOpenExperienceEdit] = useState(false);
  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-4 border-t">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Experience</h2>

          <div className="flex justify-start items-center gap-4">
            <FiPlus
              className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600"
              onClick={() => setOpenExperienceAdd(true)}
            />
            <FiEdit3
              className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600"
              onClick={() => setOpenExperienceEdit(true)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {userData?.experience?.map((experience: any, index: number) => {
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
