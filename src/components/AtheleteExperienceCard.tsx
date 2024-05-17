import React from "react";
import dateFormat from "dateformat";
import Image from "next/legacy/image";

const AthleteExperienceCard = ({ experience }: any) => {
  return (
    <div className="border rounded-md px-5 py-5 flex flex-col">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">{experience.title}</h1>

        <div>
          <Image width={32} height={32} layout="intrinsic" src="/images/goldMedal.png" alt="" className="" />
        </div>
      </div>

      <div className="flex flex-col gap-1 text-sm pt-2 pb-3">
        <div className="flex items-center justify-start gap-2">
          <span>{experience.location}</span>

          <span className="text-gray-500">•</span>

          <span className="text-sm">
            {dateFormat(experience.date, "mmmm dS, yyyy")}
          </span>

          <span className="text-gray-500">•</span>

          <span>{experience.duration} Hours</span>
        </div>

        <div className="flex items-center justify-start gap-2">
          <p>
            Sport played -{" "}
            <span className="font-medium"> {experience.sport}</span>
          </p>
          <span className="text-gray-500">•</span>
          <p className="">
            Outcome - <span className="font-medium">{experience.outcome}</span>
          </p>
        </div>

        <div>
          <p className="text-sm">
            Went through{" "}
            <span className="font-medium">{experience.organization}</span> under
            the guidance of{" "}
            <span className="font-medium">{experience.coach}</span>
          </p>
        </div>
      </div>

      <div className="text-sm py-2 border-t">
        <span className="text-base font-semibold">Description</span>
        <p className="">{experience.description}</p>
      </div>

      <div className="text-sm py-2 pb-0 border-t">
        <span className="text-base font-semibold">Injury Information</span>

        <p className="">{experience.healthInjury}</p>
      </div>
    </div>
  );
};

export default AthleteExperienceCard;
