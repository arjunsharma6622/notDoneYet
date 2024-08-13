import { IconButton } from "@/components/ui/IconButton";
import useFetchData from "@/hooks/useFetchData";
import { API_HEAD } from "@/lib/utils";
import { useEffect, useState } from "react";
import PostForm from "../(modals)/PostForm";
import DashboardPostCard from "./DashboardPostCard";
import PostCardSkeleton from "@/components/skeletons/Post/PostCardSkeleton";

const Posts = ({ userData }: { userData: any }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [openPostForm, setOpenPostForm] = useState(false);

  const { isLoading, error, refetch } = useFetchData<any>(
    `${API_HEAD}/posts/getPosts/authenticated`,
    (fetchedData) => {
      setUserPosts(fetchedData.data);
    }
  );

  const fetchUserPosts = async () => {
    try {
      const res = await fetch(`${API_HEAD}/posts/getPosts/user?userId=${userData?._id}`);
      const data = await res.json();
      setUserPosts(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserPosts();
  }, [])

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
        {isLoading ? (
          <div className="flex items-start gap-2 w-full">
            <PostCardSkeleton />
            <PostCardSkeleton />
          </div>
        ) :
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {userPosts?.length > 0 ? (
              userPosts?.map((post: any, index: number) => (
                <DashboardPostCard
                  key={index}
                  currUser={userData}
                  post={post}
                  setUserPosts={setUserPosts}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No posts</p>
            )}

          </div>
        }
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
