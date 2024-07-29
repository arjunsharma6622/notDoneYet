"use client";
import Image from "next/legacy/image";
import Link from "next/link";

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

  return (
    <div
      className={` justify-between py-3 flex gap-2 w-full items-center ${index !== following.length - 1 && "border-b border-gray-300"}`}
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
        <Link href={`/messages/${follow?.conversationId ? follow?.conversationId : `new/${follow?._id}`}`} className="px-3 py-1 mt-1 text-sm bg-primary text-white rounded-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FollowingUserCard;
