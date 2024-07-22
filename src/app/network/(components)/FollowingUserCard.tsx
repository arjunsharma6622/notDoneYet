"use client";

import { unfollowUser } from "@/actions/user";
import Image from "next/legacy/image";
import Link from "next/link";
import { toast } from "sonner";

const FollowingUserCard = ({
  follow,
  following,
  index,
  sessionUserId,
}: {
  follow: any;
  following: any;
  index: number;
  sessionUserId: string;
}) => {
  const handleUnfollowUser = async () => {
    console.log(follow?._id, sessionUserId);
    try {
      await unfollowUser(follow?._id, sessionUserId);
      toast.success("User Unfollowed");
      console.log("done");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div
      className={`flex gap-2 items-start justify-between py-5 ${index !== following.length - 1 && "border-b border-gray-300"}`}
    >
      <Link
        href={`/${follow?.role}/${follow?.userName}`}
        className="flex gap-2"
      >
        <div className="w-14">
          <Image
            src={follow?.image}
            referrerPolicy="no-referrer"
            alt=""
            width={56}
            height={56}
            layout="intrinsic"
            className="object-cover rounded-full"
          />
        </div>

        <div>
          <h1 className="">{follow?.name}</h1>

            <button className="px-3 py-1 mt-1 text-sm bg-primary text-white rounded-full">
              Message
            </button>
        </div>
      </Link>

    </div>
  );
};

export default FollowingUserCard;
