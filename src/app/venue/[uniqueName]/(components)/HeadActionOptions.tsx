"use client";

import useAuth from "@/context/useAuth";
import { API_HEAD } from "@/lib/utils";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { Flame } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BiShare } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { toast } from "sonner";

const HeadActionOptions = ({
  userData,
}: {
  userData: any;
}) => {
  const {auth} = useAuth()
  const {user : authenticatedUser} = auth;

  const [isFollowing, setIsFollowing] = useState(userData?.followers?.includes(authenticatedUser?._id));
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const handleToggleFollowClick = async () => {
    try {
      if (!authenticatedUser) {
        toast.info("Please login to follow user", {
          action: (
            <Link href={"/login"} className="text-black underline">
              Login here
            </Link>
          ),
        });
        return;
      }
      
      if (userData._id === authenticatedUser?._id) {
        toast.info("You can't follow yourself");
        return;
      }

      setIsFollowLoading(true)
      const response = await axios.post(`${API_HEAD}/user/toggleFollow`, {
        currentUserId : authenticatedUser?._id,
        selectedUserId: userData._id
      })
      if (response?.data?.message === "Success") {
        setIsFollowing(!isFollowing)
        setIsFollowLoading(false)
        toast.success("Following user");
      }
    }
    catch (err) {
      setIsFollowLoading(false)
      console.error("Error following user:", err);
      toast.error("Error following user" + err);
    }
  };

  const handleLikeProfile = async () => {
    try {
      if (!authenticatedUser) {
        toast.info("Please login to like profile", {
          action: (
            <Link href={"/login"} className="text-black underline">
              Login here
            </Link>
          ),
        });
        return;
      }
      if (userData._id === authenticatedUser?._id) {
        toast.info("You can't like yourself");
        return;
      }
      const response = await axiosInstance.post(`/user/toggleProfileLike`, {
        profileId: userData._id
      })
      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message);
      }
    } catch (err) {
      console.error("Error liking user:", err);
      toast.error("Error liking user");
    }
  };

  return (
    <div className="flex items-center gap-4">
      {isFollowing ? (
        <Link href={`/messages/`}>
          <button
            className="bg-blue-600 text-white py-1 px-4 rounded-sm"
            type="submit"
          >
            Message
          </button>
        </Link>
      ) : (
        <form action={handleToggleFollowClick}>
          <button
            className="bg-blue-600 text-white py-1 px-4 rounded-full"
            type="submit"
          >
            Follow
          </button>
        </form>
      )}

      <form action={handleLikeProfile}>
        <button
          type="submit"
          className="px-2 py-2 rounded-full bg-orange-100 cursor-pointer flex items-center gap-2"
        >
          {userData?.profileLikes?.length > 0 &&
            <span className="text-orange-600 text-sm font-medium">
              {userData?.profileLikes?.length}
            </span>
          }
          {userData?.profileLikes?.includes(authenticatedUser?._id) ? (
            <Flame fill="#ea580c" className="text-orange-600 w-5 h-5" />
          ) : (
            <Flame className="text-orange-600 w-5 h-5" />
          )}
        </button>
      </form>

      <div className="px-2 py-2 rounded-full bg-blue-100 cursor-pointer -scale-x-100">
        <BiShare className="text-blue-600 w-5 h-5" />
      </div>
      <div className="px-2 py-2 rounded-full bg-gray-100 cursor-pointer">
        <FiMoreVertical className="text-gray-600 w-5 h-5" />
      </div>
    </div>
  );
};

export default HeadActionOptions;
