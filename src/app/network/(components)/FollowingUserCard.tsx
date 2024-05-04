"use client";

import { unfollowUser } from "@/actions/user";
import { toast } from "sonner";

const FollowingUserCard = ({
  follow,
  following,
  index,
  session,
}: {
  follow: any;
  following: any;
  index: number;
  session: any;
}) => {
  const handleUnfollowUser = async () => {
    try {
      await unfollowUser(follow?._id, session?.user?._id);
      toast.success("User Unfollowed");
      console.log("done");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div
      className={`flex gap-2 items-center justify-between py-5 ${index !== following.length - 1 && "border-b border-gray-300"}`}
    >
      <div className="flex gap-2">
        <div className="w-14">
          <img
            src={follow?.image}
            referrerPolicy="no-referrer"
            alt=""
            className="w-14 h-14 object-cover rounded-full"
          />
        </div>

        <div>
          <h1 className="">{follow?.name}</h1>
          <p className="text-gray-600 text-sm">{follow?.bio}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <button className="px-4 py-2 bg-primary text-white rounded-md">
          Message
        </button>
        <form action={handleUnfollowUser}>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            type="submit"
          >
            Unfollow
          </button>
        </form>
      </div>
    </div>
  );
};

export default FollowingUserCard;
