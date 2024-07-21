"use client";

import { followUser, toggleProfileLike, unfollowUser } from "@/actions/user";
import { Flame } from "lucide-react";
import Link from "next/link";
import { BiShare } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";
import { toast } from "sonner";

const HeadActionOptions = ({
  userData,
  session,
}: {
  userData: any;
  session: any;
}) => {
  const handleFollowClick = async () => {
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
      await followUser(userData._id, session?.user?._id);
      toast.success("Following user");
    } catch (err) {
      console.error("Error following user:", err);
      toast.error("Error following user");
    }
  };

  const handleUnfollowClick = async () => {
    try {
      await unfollowUser(userData._id, session?.user?._id);
      toast.success("Unfollowed user");
    } catch (err) {
      console.error("Error unfollowing user:", err);
      toast.error("Error unfollowing user");
    }
  };

  const handleLikeProfile = async () => {
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
      toast.success(message as string);
    } catch (err) {
      console.error("Error liking user:", err);
      toast.error("Error liking user");
    }
  };

  return (
    <div className="flex items-center gap-4">
      {userData?.followers?.includes(session?.user?._id) ? (
        <Link href={`/messages/`}>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-full"
            type="submit"
          >
            Message
          </button>
        </Link>
      ) : (
        <form action={handleFollowClick}>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-full"
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
          { userData?.profileLikes?.length > 0 &&
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
