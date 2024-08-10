import dateFormat from "dateformat";
import { MapPin } from "lucide-react";

const AthleteExperienceCard = ({ experience }: any) => {
  return (
    <div className="border rounded-md px-4 py-4 flex flex-col">

      <div className="flex items-center justify-between gap-0">
        <h1 className="text-xl font-semibold">{experience.title}</h1>
      </div>

      <div className="flex flex-col gap-1 text-sm pb-3">
        <div className="flex items-start flex-col justify-start gap-2">


          {experience?.type === "tournament" &&
            <div className="flex items-center justify-start gap-2">
              <span className="text-sm">
                {dateFormat(experience.date, "mmmm dS, yyyy")}
              </span>

              <span className="text-gray-500">•</span>

              <span>{experience.duration} Hours</span>

            </div>
          }


        </div>






        <div className="flex items-center justify-start gap-2">
          <span className="font-medium"> {experience.sport} @</span>
          <p className="text-sm">
 
            {experience.organization && 
              <span className=""><MapPin className="inline w-4 h-4" /> {experience.organization},</span>
            }
                                <span> {experience.location}</span>


            {experience.coach &&
              <span className="font-medium">{experience.coach}</span>
            }
          </p>


          {experience?.type === "tournament" && experience.outcome &&
            <>
              <span className="text-gray-500">•</span>
              <p className="">
                Outcome - <span className="font-medium">{experience.outcome}</span>
              </p>
            </>
          }
        </div>





      </div>
      <p className="">{experience.description}</p>
      {experience?.type === "tournament" &&
        <div className="text-sm py-2 pb-0 border-t">
          <span className="text-base font-semibold">Injury Information</span>

          <p className="">{experience.healthInjury}</p>
        </div>
      }
    </div>
  );
};

export default AthleteExperienceCard;
