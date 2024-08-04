"use client"

import axiosInstance from "@/utils/axiosInstance";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import FollowingSkeleton from "./FollowingSkeleton";
import FollowingUserCard from "./FollowingUserCard";

const FollowingUsers = () => {

  const [followingUsers, setFollowingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      const response = await axiosInstance.get(`/user/following`);
      const userFollowings = response.data.data.userFollowings;
      setFollowingUsers(userFollowings);
      setIsLoading(false);
    }
    fetchFollowingUsers();
  }, []);

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
                followingUsers={followingUsers}
                setFollowingUsers={setFollowingUsers}
              />
            ))}
          </div>
          : <div className="w-full text-sm text-gray-500 flex flex-col items-center justify-center text-center h-24">
            <p>You dont follow anyone</p>
            <p>Go to the <Link href={"/network"} className="font-medium text-blue-600 underline">Network page <ArrowUpRight strokeWidth={1.6} className="w-5 h-5 inline -ml-1 mb-1" /></Link>  to follow people</p>
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
