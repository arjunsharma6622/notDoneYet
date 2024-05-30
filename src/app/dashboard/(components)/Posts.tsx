import { API_HEAD } from "@/lib/utils";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import useSWR from "swr";
import PostForm from "../(modals)/PostForm";
import ProfilePostCard from "@/components/client/ProfilePostCard";
import { IconButton } from "@/components/ui/IconButton";

const Posts = ({ userData }: { userData: any }) => {
  const [openPostForm, setOpenPostForm] = useState(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: allUserPosts,
    error,
    isLoading,
  } = useSWR(`${API_HEAD}/posts/user/${userData?._id}`, fetcher);

  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
        <div className="flex justify-between items-center gap-1">
          <h2 className="text-xl font-bold">Posts</h2>

          <IconButton
            variant={"addLong"}
            text="Add Post"
            onClick={() => setOpenPostForm(true)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allUserPosts?.length > 0 ? (
            allUserPosts?.map((post: any, index: number) => (
              <ProfilePostCard
                key={index}
                dashboardCard={true}
                currUser={userData}
                post={post}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No posts</p>
          )}
        </div>
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
