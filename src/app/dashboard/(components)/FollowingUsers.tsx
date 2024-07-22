"use client"

import { API_HEAD } from "@/lib/utils";
import { Suspense } from "react";
import useSWR from "swr";
import FollowingSkeleton from "./FollowingSkeleton";
import FollowingUserCard from "./FollowingUserCard";

const FollowingUsers = ({ userId }: { userId: string }) => {

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: following,
    error,
    isLoading,
  } = useSWR(`${API_HEAD}/user/following/${userId}`, fetcher);

  return (<>
  {following?.length > 0 &&
    <div className="border rounded-md">
      <div className="w-full px-3 border-b py-3">
        <h1 className="text-xl font-bold">Your Network</h1>
      </div>
      <Suspense fallback={<FollowingSkeleton />}>
        <div className="flex flex-col px-5">
          {following?.map((follow: any, index: number) => (
            <FollowingUserCard
              key={follow._id}
              follow={follow}
              following={following}
              index={index}
              sessionUserId={userId}
            />
          ))}
        </div>
      </Suspense>
    </div>
  }
  </>
  );
};

export default FollowingUsers;
