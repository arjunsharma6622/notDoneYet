import { followUser } from "@/actions/user";
import { API_HEAD } from "@/lib/utils";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { FiMessageCircle } from "react-icons/fi";
import { toast } from "sonner";
import useSWR from "swr";

const RecommendedUsers = ({ userData }: { userData: any }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: allRecommendedUsers,
    error,
    isLoading,
  } = useSWR(`${API_HEAD}/user/recommended/${userData?._id}`, fetcher);

  const handleFollowUser = async (userId: string) => {
    try {
      await followUser(userId, userData?._id);
      console.log("done");
      toast.success("User Followed");
      console.log("done 2");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full flex flex-col border rounded-md">
      {allRecommendedUsers?.map((user: any, index: number) => (
        <div
          key={user._id}
          className={`w-full flex justify-start items-start gap-4 p-2 md:p-4 ${
            index === allRecommendedUsers.length - 1 ? "border-b-0" : "border-b"
          }`}
        >
          <div className="flex justify-center items-center">
            <Image
              src={
                user?.image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
              className="rounded-full object-cover"
              referrerPolicy="no-referrer"
              height={48}
              width={48}
              layout="intrinsic"
            />
          </div>
          <div className="flex flex-col w-fit">
            <Link
              href={`/${user.role}/${user.userName}`}
            >
              <h1 className="font-semibold text-sm md:text-base">
                {user?.name}
              </h1>
            </Link>
            <div className="text-xs md:text-sm">
              <span>{user.followers?.length} followers</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedUsers;
