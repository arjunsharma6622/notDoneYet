"use client"

import UsersLoadingSkeleton from "@/components/skeletons/User/UsersLoadingSkeleton";
import { Suspense } from "react";
import FollowingUsers from "./(components)/FollowingUsers";
import Users from "./(components)/Users";
import withAuth from "@/hocs/withAuth";

const Network = () => {

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex justify-between flex-col gap-2 md:flex-row md:gap-4 items-start w-full mx-2 mt-2">
        <div className="flex-[5] w-full border rounded-xl p-4 flex flex-col gap-4">
          <div className="w-full">
            <h1 className="text-2xl font-bold">Discover new network</h1>
          </div>
          <Suspense fallback={
            <UsersLoadingSkeleton />
          }>
            <Users />
          </Suspense>
        </div>

        <div className="flex-[2] w-full flex flex-col gap-4">
          <FollowingUsers />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Network);