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
      className={`flex gap-2 items-start justify-between py-3 ${index !== following.length - 1 && "border-b border-gray-300"}`}
    >
      <Link
        href={`/${follow?.role}/${follow?.userName}`}
        className="flex gap-2 w-full items-center"
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

        <div className="w-full">
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
