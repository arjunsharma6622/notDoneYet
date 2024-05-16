import PostImageSection from "@/components/client/PostImageSection";
import Link from "next/link";
import React from "react";
import { FcLike } from "react-icons/fc";

const ProfilePostCard = ({ post }: any) => {
  return (
    <Link
      href={`/post/${post._id}`}
      className="rounded-md flex flex-col gap-2 border px-2 py-2"
    >
      <div className="flex items-start flex-col justify-start gap-4">

        <div>
          <div>
            <img src={post?.user?.image} alt="" className="w-10 h-10 rounded-full"/>
          </div>
          <span>{post?.user?.name}</span>
        </div>
                <p className="flex-[11] text-sm">{post.description}</p>

        <div className="w-full flex flex-col gap-4 px-2 py-2">
          {post?.images.length > 0 && (
            <img src={post?.images[0]} alt="" />
          )}
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="flex items-center justify-center gap-1">
            {post?.likes?.length} <FcLike className="w-4 h-4" />
          </span>
          <span>{post?.comments?.length} Comments</span>
        </div>
      </div>
    </Link>
  );
};

export default ProfilePostCard;
