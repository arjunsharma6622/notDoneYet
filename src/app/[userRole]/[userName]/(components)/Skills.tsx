import React from "react";

const Skills = ({ userData }: any) => {
  return (
    <div className=" flex flex-col gap-2 border-t py-2 px-3 md:px-6 md:py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {userData.role == "doctor" ? "Skills" : "Sports"}
        </h2>
      </div>

      <div className="flex flex-wrap gap-4">
        {userData.sports?.map((sport: string) => (
          <div key={sport} className="bg-gray-200 rounded-full px-4 py-1">
            <span className="">{sport}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
