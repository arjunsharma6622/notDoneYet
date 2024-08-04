"use client"

import useAuth from "@/context/useAuth";
import Image from "next/legacy/image";

const UserInfoCard = () => {
  const { auth } = useAuth();
  const {user : authenticatedUser} = auth;

  return (
    <div className="flex flex-col gap-2 items-center justify-start border rounded-md h-fit px-4 py-4">
      <Image
        width={40}
        height={40}
        layout="intrinsic"
        alt=""
        src={authenticatedUser?.image}
        className="rounded-full w-20 h-20"
        referrerPolicy="no-referrer"
      />

      <div className="flex flex-col gap-1 items-center">
        <p className="text-lg">{authenticatedUser?.name}</p>
        <p className="text-xs text-center">{authenticatedUser?.bio}</p>
      </div>
      <div className="flex items-center justify-center gap-2 text-sm">
        <span>{authenticatedUser?.followers} Followers</span>
        <span>{authenticatedUser?.following} Following</span>
      </div>
    </div>
  );
};

export default UserInfoCard;