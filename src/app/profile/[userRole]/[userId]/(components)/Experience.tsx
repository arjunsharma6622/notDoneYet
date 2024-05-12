import AthleteExperienceCard from "@/components/AtheleteExperienceCard";
import DoctorExperienceCard from "@/components/DoctorExperienceCard";
import React from "react";

const Experience = ({ userData }: { userData: any }) => {
  return (
    <div className=" flex flex-col gap-4 border-t py-2 px-3 md:px-6 md:py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Experience</h2>
      </div>
      {userData.role == "athlete" ? (
        <div className="flex flex-col gap-2">
          {userData.experience?.map((experience: any, index: number) => (
            <AthleteExperienceCard experience={experience} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {userData.experience?.map((experience: any, index: number) => (
            <DoctorExperienceCard experience={experience} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;
