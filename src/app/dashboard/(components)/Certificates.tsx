import React from "react";
import { FiEdit3, FiPlus } from "react-icons/fi";

const Certificates = ({userData} : {userData: any}) => {
  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Certificates</h2>

          <div className="flex justify-start items-center gap-4">
            <FiPlus className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600" />
            <FiEdit3 className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Certificates;
