import { timeAgo } from "@/lib/utils";
import Image from "next/legacy/image";
import Link from "next/link";
import { FcLike } from "react-icons/fc";
import PostCardMore from "./PostCardMore";

const ProfilePostCard = ({ post, currUser, dashboardCard }: any) => {
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

          <PostCardMore
            dashboardCard={dashboardCard}
            postData={post}
            currUser={currUser}
          />
        </div>

        <Link href={`/post/${post._id}`} className="flex flex-col gap-2">
          <div className="w-full grid grid-cols-2 gap-2">
            {post?.images.length > 0 &&
              post?.images
                .slice(0, 2)
                .map((image: any, index: number) => (
                  <Image
                    key={index}
                    width={300}
                    height={220}
                    layout="intrinsic"
                    src={image}
                    alt=""
                    className="w-full rounded-md object-cover"
                  />
                ))}
          </div>
          <p className="flex-[11] text-sm truncatedText">{post.description}</p>
        </Link>

        <div className="flex justify-between items-center text-xs">
          <span className="flex items-center justify-center gap-1">
            {post?.likes?.length} <FcLike className="w-4 h-4" />
          </span>
          <span>{post?.comments?.length} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostCard;
