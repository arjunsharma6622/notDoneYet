import React, { useState } from "react";
import ProfilePostCard from "./ProfilePostCard";
import { FiPlus } from "react-icons/fi";
import useSWR from "swr";
import PostForm from "../(modals)/PostForm";

const Posts = ({ userData }: { userData: any }) => {
  const [openPostForm, setOpenPostForm] = useState(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: allUserPosts,
    error,
    isLoading,
  } = useSWR(`/api/posts/user/${userData?._id}`, fetcher);

  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
        <div className="flex justify-between items-center gap-1">
          <h2 className="text-xl font-bold">Posts</h2>

          <div
            className="flex cursor-pointer justify-start w-fit bg-gray-200 rounded-full md:px-4 px-3 py-1 items-center gap-1 md:gap-2"
            onClick={() => setOpenPostForm(true)}
          >
            <FiPlus className="cursor-pointer h-5 md:h-6 w-5 md:w-6 text-gray-600" />
            <span className="md:text-sm text-xs">Add New Post</span>
          </div>
        </div>

        {allUserPosts?.map((post: any) => (
          <ProfilePostCard key={post._id} post={post} />
        ))}
      </div>

      {openPostForm && (
        <div className="absolute">
          <PostForm
            open={openPostForm}
            user={userData}
            setOpen={setOpenPostForm}
          />
        </div>
      )}
    </>
  );
};

export default Posts;
