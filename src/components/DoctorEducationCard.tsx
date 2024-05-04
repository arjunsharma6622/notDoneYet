import React from "react";
import dateFormat from "dateformat";

const DoctorEducationCard = ({ educationDetails }: any) => {
  return (
    <div className="border shadow-md rounded-md px-6 py-4">
      <span className="text-lg font-semibold">{educationDetails.school}</span>
      <div className="flex items-center gap-2 text-sm">
        <span>{educationDetails.degree}</span>
        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
        <span>{educationDetails.fieldOfStudy}</span>
        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
        <span>{educationDetails.gpa} GPA</span>
      </div>
      <span>{educationDetails.description}</span>
      <span>
        {dateFormat(educationDetails.startDate, "mmmm, yyyy") +
          " - " +
          dateFormat(educationDetails.endDate, "mmmm, yyyy")}
      </span>
    </div>
  );
};

export default DoctorEducationCard;
