"use client";

import useAuth from "@/context/useAuth";
import { timeAgo } from "@/lib/utils";
import axiosInstance from "@/utils/axiosInstance";
import { LoaderCircle, MessageCircle, Share } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";
import { toast } from "sonner";
import PostImageSection from "./PostImageSection";
import PostCardMore from "./PostCardMore";

const PostComment = dynamic(
  () => import("./PostComment"),
  {
    loading: () => <LoaderCircle strokeWidth={1.7} className="animate-spin md:h-5 md:w-5 w-4 h-4" />,
    ssr: false
})

const PostCard = ({ postData }: any) => {
  const { auth } = useAuth()
  const { user: authenticatedUser } = auth;

  const [openCommentInput, setOpenCommentInput]: [boolean, any] =
    useState(false);
  const [commentText, setCommentText]: [string, any] = useState("");
  const [openLikes, setOpenLikes]: [boolean, any] = useState(false);

  const handlePostLike = async () => {
    try {
      console.log("clicked on like");

      const res: any = await axiosInstance.post(`/posts/togglePostLike`, { postId: postData?._id })

      toast.success(res.message);
    } catch (err) {
      console.log(err);
      toast.error("Failed to like post");
    }
  };

  const isPostLiked = postData?.likes?.some(
    (like: any) => like._id === authenticatedUser?._id
  );

  return (
    <div className="flex border flex-col rounded-md px-2 py-2 gap-2 max-w-[650px] bg-white">
      <div className="flex items-center justify-between gap-4 border-b pb-2">
        <div className="flex items-center justify-start gap-2">
          <div>
          <Link className="flex w-12 h-12 rounded-full" href={`/${postData?.user?.role}/${postData?.user?.userName}`}>
            <Image
              src={postData?.user?.image}
              alt=""
              width={48}
              height={48}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="rounded-full w-12 h-12 object-cover"
            />
          </Link>
          </div>

          <div className="flex flex-col w-fit">
            <div className="text-base flex items-center gap-2">
              <Link
                href={`/${postData?.user?.role}/${postData?.user?.userName}`}
              >
                {postData?.user?.name}
              </Link>
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <span className="text-xs text-gray-500">
                {timeAgo(postData?.createdAt)}
              </span>
            </div>
            <p className="text-xs text-gray-500 truncatedText1 text-start">{postData?.user?.bio}</p>
          </div>
        </div>

        <PostCardMore postData={postData} currUser={authenticatedUser} />
      </div>

      <div className="w-full flex flex-col gap-4 px-2 py-2">
        <p className="text-sm text-start">{postData?.description}</p>
        {postData?.images.length > 0 && (
          <PostImageSection images={postData?.images} />
        )}
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center border-t pt-3 justify-between w-full px-6 gap-2">
          <div
            className={`flex flex-[1] items-center cursor-pointer gap-2 ${isPostLiked ? "text-pink-500" : ""}`}
            onClick={handlePostLike}
          >
            {isPostLiked ? (
              <RiHeart2Fill className="w-5 h-5" />
            ) : (
              <RiHeart2Line className="w-5 h-5" />
            )}
            {postData?.likes?.length > 0 && <>{postData?.likes?.length}</>}

            <span>{postData?.likes?.length > 1 ? "Likes" : "Like"}</span>
          </div>

          <div
            className={`flex flex-[1] justify-center items-center gap-2 cursor-pointer ${openCommentInput ? "text-orange-500" : ""
              }`}
            onClick={() => setOpenCommentInput(!openCommentInput)}
          >
            <MessageCircle className="w-5 h-5" />
            {postData?.comments?.length > 0 && (
              <>{postData?.comments?.length}</>
            )}
            <span>
              {postData?.comments?.length > 1 ? "Comments" : "Comment"}
            </span>
          </div>

          <div className="flex flex-[1] justify-end items-center gap-2">
            <Share className="w-5 h-5" /> <span>Share</span>
          </div>
        </div>
      </div>

      {openCommentInput && (
        <PostComment
          authenticatedUser={authenticatedUser}
          postData={postData}
          commentText={commentText}
          setCommentText={setCommentText}
          />
      )}

      {/* come back and take a look at it */}

      {/* {openLikes && (
        <div className="flex flex-col w-full px-4">
          <div className="w-full border-b py-3 flex items-start gap-2">
            {postData?.likes?.map((like: any) => (
              <div
                key={like._id}
                className="w-10 h-10 rounded-full overflow-hidden"
              >
                <Image
                  src={like.image}
                  alt="profile"
                  width={40}
                  height={40}
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      )} */}

    </div>
  );
};

export default PostCard;
