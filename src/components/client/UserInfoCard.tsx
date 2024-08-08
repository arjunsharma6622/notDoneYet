"use client"

import axiosInstance from "@/utils/axiosInstance";
import { Flame } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import UserInfoSkeletonCard from "../skeletons/User/UserInfoSkeletonCard";

const UserInfoCard = () => {

  const [userData, setUserData]: any = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAuthenticatedUser = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/user/authenticatedUser`);
      setUserData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [])

  return (
    <>{isLoading ?
      <UserInfoSkeletonCard />
      :
      <div className="flex flex-col gap-2 items-center justify-start border rounded-lg h-fit w-full bg-white pb-4">
        <Image
          width={200}
          height={200}
          alt=""
          src={userData?.backgroundImg}
          className="w-full h-fit aspect-[4/1] object-cover rounded-t-md"
          referrerPolicy="no-referrer"
        />
        <Image
          width={80}
          height={80}
          layout="intrinsic"
          alt=""
          src={userData?.image}
          className="rounded-full w-20 h-20 border-white border-4 -mt-14"
          referrerPolicy="no-referrer"
        />

        <div className="flex flex-col items-center -mt-2 px-3">
          <p className="text-base font-medium">{userData?.name}</p>
          <p className="text-xs font-light text-center text-gray-500">{userData?.bio}</p>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="bg-gray-200 rounded-md p-1 px-2 text-xs">{userData?.followers?.length} Followers</span>
          <span className="bg-gray-200 rounded-md p-1 px-2 text-xs">{userData?.following?.length} Following</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="bg-orange-100 rounded-full p-1 px-2 text-orange-600 flex items-center justify-center gap-2 text-sm">
            {userData?.profileLikes?.length}
            <Flame strokeWidth={1.7} className="w-5 h-5 inline" />
          </span>
        </div>
      </div>
    }
    </>
  );
};

export default UserInfoCard;