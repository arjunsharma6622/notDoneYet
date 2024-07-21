import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import React, { Suspense } from "react";
import FollowingUserCard from "./FollowingUserCard";
import FollowingSkeleton from "./FollowingSkeleton";

const FollowingUsers = async ({userId} : {userId: string}) => {
    const following = await axios
    .get(`${API_HEAD}/user/following/${userId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));
  return (
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
  );
};

export default FollowingUsers;
