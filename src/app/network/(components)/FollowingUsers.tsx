"use client"

import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import FollowingSkeleton from "./FollowingSkeleton";
import FollowingUserCard from "./FollowingUserCard";

const FollowingUsers = ({ userId }: { userId: string }) => {

  const [followingUsers, setFollowingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      const response = await axios.get(`${API_HEAD}/user/following/${userId}`);
      const data = response.data;
      setFollowingUsers(data);
      setIsLoading(false);
    }
    fetchFollowingUsers();
  }, [userId]);


  return (
    <div className="border rounded-md">
      <div className="w-full px-3 border-b py-3">
        <h1 className="text-xl font-bold">Your Network</h1>
      </div>
      {(!isLoading) ? // if not loading then show the following users
        followingUsers.length > 0 ?
          <div className="flex flex-col px-5">
            {followingUsers?.map((follow: any, index: number) => (
              <FollowingUserCard
                key={follow._id}
                follow={follow}
                index={index}
                sessionUserId={userId}
                followingUsers={followingUsers}
                setFollowingUsers={setFollowingUsers}
              />
            ))}
          </div>
          : <div className="w-full text-sm text-gray-500 flex flex-col items-center justify-center text-center h-24">
            <p>You dont follow anyone</p>
            <p>Discover new Athletes, Doctors, sponsors and more here</p>
          </div>

        : isLoading &&
        <div className="flex flex-col px-5 gap-4 py-4">
          {[...Array(6)].map((follow: any, index: number) => (
            <FollowingSkeleton key={index} />
          ))}
        </div>
      }
    </div>
  );
};

export default FollowingUsers;
