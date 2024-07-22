import { Suspense } from "react";
import Venues from "./(components)/Venues";

const page = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full flex gap-10 flex-col items-sart m-5">
        <h1 className="text-3xl font-bold text-center w-full">View all Venues</h1>
      <Suspense fallback={<div>Loading...</div>}>
      <Venues />
      </Suspense>
      </div>
    </div>
  )
};

export default page;
