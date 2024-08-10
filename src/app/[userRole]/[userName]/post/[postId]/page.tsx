import PostCard from "@/components/client/PostCard";
import UserInfoCard from "@/components/client/UserInfoCard";
import axiosInstance from "@/utils/axiosInstance";

const Page = async ({ params }: { params: { postId: string } }) => {
  const postID = params.postId;

  const postData = await axiosInstance
    .get(`/posts/${postID}`)
    .then((res) => res.data.data)
    .catch((err) => console.error("Error", err));


  return (
    <div className=" flex justify-center gap-5 w-full ">
      {postData && postData.user && (
        <div className="md:w-[95%] flex md:flex-row md:gap-10 flex-col items-start mt-5">
          <div className="flex-[3] sticky top-20">
            <UserInfoCard />
          </div>

          <div className="flex-[6]">
            <PostCard postData={postData}/>
          </div>

          <div className="flex-[3]"></div>
        </div>
      )}
    </div>
  );
};

export default Page;
