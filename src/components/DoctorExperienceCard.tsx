import dateFormat from "dateformat";
import ShowMore from './ShowMore';

const DoctorExperienceCard = ({experience} : any) => {
  return (

    <div
    className="border rounded-md px-5 py-5 flex flex-col"
  >
    <div className="flex items-center justify-between gap-2">
      <h1 className="text-xl font-semibold">
        {experience.title}
      </h1>
    </div>

    <div className="flex flex-col gap-1 text-sm pb-3">
      <div className="flex items-center justify-start gap-2">


<span>{experience.specialization}</span>
<span className="text-gray-500">•</span>

        <span>{experience.location}</span>



        </div>
      <div className="flex items-center justify-start gap-2">
        <span>{dateFormat(experience.startDate, "mmmm, yyyy")}</span>

        <span className="text-gray-500">-</span>

        <span>{dateFormat(experience.endDate, "mmmm, yyyy")}</span>

        </div>

    </div>

    <div className="text-sm py-2 border-t">
      <span className="text-base font-semibold">
        Description
      </span>
      <ShowMore content={experience.description} />
    </div>

  </div>  )
}

export default DoctorExperienceCard