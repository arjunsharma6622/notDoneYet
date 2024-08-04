import React, { Suspense } from "react";
import Doctors from "./(components)/Doctors";
import UsersLoadingSkeleton from "@/components/skeletons/User/UsersLoadingSkeleton";

const page = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full flex gap-10 flex-col items-sart m-5">
        <h1 className="text-3xl font-bold text-center w-full">View all Doctors</h1>
      <Suspense fallback={<UsersLoadingSkeleton />}>
      <Doctors />
      </Suspense>
      </div>
    </div>
  )
};

export default page;
