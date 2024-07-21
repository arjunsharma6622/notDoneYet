import AthleteExperienceCard from "@/components/AtheleteExperienceCard";
import DoctorExperienceCard from "@/components/DoctorExperienceCard";
import React from "react";

const Experience = ({ userData }: { userData: any }) => {

  const sortedExperience = userData.experience?.sort((a: any, b: any) => {
    const dateA = a.endDate ? new Date(a.endDate).getTime() : new Date(a.date).getTime();
    const dateB = b.endDate ? new Date(b.endDate).getTime() : new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <div className=" flex flex-col gap-4 border-t py-2 px-3 md:px-6 md:py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Experience</h2>
      </div>
      {userData.role == "athlete" ? (
        <div className="flex flex-col gap-2">
          {sortedExperience?.map((experience: any, index: number) => (
            <AthleteExperienceCard experience={experience} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {sortedExperience?.map((experience: any, index: number) => (
            <DoctorExperienceCard experience={experience} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;
