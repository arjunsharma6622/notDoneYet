import PostImageSection from "@/components/client/PostImageSection";
import { timeAgo } from "@/lib/utils";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DashboardPostCardMore from "./DashboardPostCardMore";
import { useState } from "react";

const DashboardPostCard = ({ post, setUserPosts }: any) => {
  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
  return (
    <div className="rounded-md flex flex-col gap-2 border px-2 py-2 w-full">
      <div className="flex items-start flex-col justify-start gap-4 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Image
              width={40}
              height={40}
              layout="intrinsic"
              src={post?.user?.image}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col -gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">{post?.user?.name}</span>
                <div className="w-1 h-1 rounded-full bg-black"></div>
                <span className="text-xs text-gray-500">
                  {" "}
                  {timeAgo(post?.createdAt)}
                </span>
              </div>
              <span className="text-xs">
                {post?.user?.followers?.length} followers
              </span>
            </div>
          </div>
            <DashboardPostCardMore
              moreOptionsOpen={moreOptionsOpen}
              setMoreOptionsOpen={setMoreOptionsOpen}
              postData={post}
              setUserPosts={setUserPosts}
            />
        </div>

        <Link href={`${post?.user?.role}/${post?.user?.userName}/post/${post._id}`} className="flex flex-col gap-2">
          <PostImageSection openModalOnClick={false} images={post?.images} />
          <p className="flex-[11] text-sm truncatedText">{post.description}</p>
        </Link>
        {(post?.likes?.length > 0 || post?.comments?.length > 0) &&
          <div className="w-full flex justify-between items-center text-xs">
            <span className="flex items-center justify-center gap-1">
              {post?.likes?.length > 0 &&
                <>
                  {post?.likes?.length} <Heart fill="#ef4444" className="w-4 h-4 text-red-500" />
                </>
              }
            </span>
            <span>
              {post?.comments?.length > 0 &&
                <>
                  {post?.comments?.length} Comments
                </>
              }
            </span>
          </div>
        }
      </div>
    </div>
  );
};

export default DashboardPostCard;
