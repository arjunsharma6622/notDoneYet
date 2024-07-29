"use client";

import { toggleProfileLike } from "@/actions/user";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import { Flame, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BiShare } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { toast } from "sonner";

const HeadActionOptions = ({
  userData,
  session,
}: {
  userData: any;
  session: any;
}) => {

  const [isFollowing, setIsFollowing] = useState(userData?.followers?.includes(session?.user?._id));
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const handleToggleFollowClick = async () => {
    try {
      if (!session?.user) {
        toast.info("Please login to follow user", {
          action: (
            <Link href={"/login"} className="text-black underline">
              Login here
            </Link>
          ),
        });
        return;
      }
      
      if (userData._id === session?.user?._id) {
        toast.info("You can't follow yourself");
        return;
      }

      setIsFollowLoading(true)
      const response = await axios.post(`${API_HEAD}/user/toggleFollow`, {
        currentUserId : session?.user?._id,
        selectedUserId: userData._id
      })
      if (response?.data?.message === "Success") {
        setIsFollowing(!isFollowing)
        setIsFollowLoading(false)
        setConversationId(response?.data?.conversationId)
        toast.success("Following user");
      }
    }
    catch (err) {
      setIsFollowLoading(false)
      console.error("Error following user:", err);
      toast.error("Error following user" + err);
    }
  };

  const handleLikeProfile = async ({ error }: any) => {
    try {
      if (!session?.user) {
        toast.info("Please login to like profile", {
          action: (
            <Link href={"/login"} className="text-black underline">
              Login here
            </Link>
          ),
        });
        return;
      }
      if (userData._id === session?.user?._id) {
        toast.info("You can't like yourself");
        return;
      }
      const message = await toggleProfileLike(session?.user?._id, userData._id);
      if (message?.error) {
        toast.info(message?.error?.message);
        return
      }
      toast.success(message as string);
    } catch (err) {
      console.error("Error liking user:", err);
      toast.error(`${err}`);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {(isFollowing && conversationId) ? (
        <Link href={`/messages/${conversationId}`}>
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
              isFollowLoading && <LoaderCircle className="inline ml-2 animate-spin w-5 h-5"/>
            }
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
          {userData?.profileLikes?.includes(session?.user?._id) ? (
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
