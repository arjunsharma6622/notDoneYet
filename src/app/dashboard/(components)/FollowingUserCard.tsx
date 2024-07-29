"use client";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import Image from "next/legacy/image";
import Link from "next/link";
import { toast } from "sonner";

const FollowingUserCard = ({
  follow,
  index,
  sessionUserId,
  followingUsers,
  setFollowingUsers
}: {
  follow: any;
  index: number;
  sessionUserId: string;
  followingUsers : any,
  setFollowingUsers : any
}) => {

  const handleToggleFollowClick = async () => {
    try {
      const response = await axios.post(`${API_HEAD}/user/toggleFollow`, {
        currentUserId : sessionUserId,
        selectedUserId: follow._id
      })
      if (response?.data?.message === "Success") {
        // remove the follow._id user from teh followingusers using the setfollowing
        setFollowingUsers(followingUsers.filter((user:any) => user._id !== follow._id))
        toast.success("Following user");
      }
    }
    catch (err) {
      console.error("Error following user:", err);
      toast.error("Error following user" + err);
    }
  };

  return (
    <div
      className={` justify-between py-3 flex gap-2 w-full items-center ${index !== followingUsers.length - 1 && "border-b border-gray-300"}`}
    >
      <Link
        href={`/${follow?.role}/${follow?.userName}`}
        className=""
      >
        <Image
          src={follow?.image}
          referrerPolicy="no-referrer"
          alt=""
          width={56}
          height={56}
          layout="intrinsic"
          className="object-cover rounded-full w-16"
        />
      </Link>


      <div className="w-full">
        <h1 className="">{follow?.name}</h1>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 mt-1 text-sm bg-primary text-white rounded-full">
        <Link href={`/messages/${follow?.conversationId ? follow?.conversationId : `new/${follow?._id}`}`} >
          Message
        </Link>
        </button>
        <button onClick={handleToggleFollowClick} className="bg-red-500 px-3 py-1 mt-1 text-sm text-white rounded-full">
          Unfollow
        </button>
        </div>
      </div>
    </div>
  );
};

export default FollowingUserCard;
