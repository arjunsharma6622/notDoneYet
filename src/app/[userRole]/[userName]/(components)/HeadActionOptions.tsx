"use client";

import useAuth from "@/context/useAuth";
import useFormSubmit from "@/hooks/useFormSubmit";
import axiosInstance from "@/utils/axiosInstance";
import { EllipsisVertical, Flame, LoaderCircle, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const HeadActionOptions = ({
  userData,
}: {
  userData: any;
}) => {
  const { auth } = useAuth()
  const { user: authenticatedUser } = auth;

  const [isFollowing, setIsFollowing] = useState(userData?.followers?.includes(authenticatedUser?._id));
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [profileLikes, setProfileLikes] = useState(userData?.profileLikes);

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
      const response = await axiosInstance.post(`/user/toggleFollow`, {
        selectedUserId: userData._id
      })
      if (response?.data?.statusCode === 200) {
        setIsFollowing(!isFollowing)
        setIsFollowLoading(false)
        setConversationId(response?.data?.data?.conversationId)
        toast.success("Following user");
      }
    }
    catch (err) {
      setIsFollowLoading(false)
      console.error("Error following user:", err);
      toast.error("Error following user" + err);
    }
  };

  const { onSubmit: onProfileLike, isLoading: isProfileLikeLoading } = useFormSubmit('/user/toggleProfileLike', 'post')


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
      onProfileLike({ profileId: userData._id }, (data) => {
        if(data.liked === 1){
          setProfileLikes([...profileLikes, authenticatedUser?._id])
        }else{
          setProfileLikes(profileLikes.filter((id: string) => id !== authenticatedUser?._id))
        }
      })
    } catch (err) {
      console.error("Error liking user:", err);
      toast.error(`${err}`);
    }
  };



  return (
    <div className="flex items-center gap-4">
      {(isFollowing) ? (
        <Link href={`/messages/${conversationId ? conversationId : ''}`}>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-full"
            type="submit"
          >
            Message
          </button>
        </Link>
      ) : (
        <form action={handleToggleFollowClick}>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-full"
            type="submit"
          >
            Follow
            {
              isFollowLoading && <LoaderCircle className="inline ml-2 animate-spin w-5 h-5" />
            }
          </button>
        </form>
      )}

      <form action={handleLikeProfile}>
        <button
          type="submit"
          className="px-2 py-2 rounded-full bg-orange-100 cursor-pointer flex items-center gap-2"
        >
          {profileLikes?.length > 0 &&
            <span className="text-orange-600 text-sm font-medium">
              {profileLikes?.length}
            </span>
          }
          {isProfileLikeLoading ?
            <LoaderCircle className="text-orange-600 w-5 h-5 animate-spin" />
            :
            profileLikes?.includes(authenticatedUser?._id) ? (
              <Flame fill="#ea580c" className="text-orange-600 w-5 h-5" />
            ) : (
              <Flame className="text-orange-600 w-5 h-5" />
            )}
        </button>
      </form>
      <div className="px-2 py-2 rounded-full bg-gray-100 cursor-pointer">
        <EllipsisVertical className="text-gray-600 w-5 h-5" />
      </div>
    </div>
  );
};

export default HeadActionOptions;