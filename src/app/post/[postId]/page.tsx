import { auth } from "@/auth";
import PostCard from "@/components/client/PostCard";
import UserInfoCard from "@/components/client/UserInfoCard";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";

const page = async ({ params }: { params: { postId: string } }) => {
  const session = await auth();
  const postID = params.postId;

  const postData = await axios
    .get(`${API_HEAD}/posts/${postID}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));

  return (
    <div className=" flex justify-center gap-5 w-full ">
      {postData && postData.user && (
        <div className="md:w-[95%] flex md:flex-row md:gap-10 flex-col items-start mt-5">
          <div className="flex-[3] sticky top-20">
            <UserInfoCard userData={postData.user} />
          </div>

          <div className="flex-[6]">
            <PostCard postData={postData} currUser={session?.user} />
          </div>

          <div className="flex-[3]"></div>
        </div>
      )}
    </div>
  );
};

export default page;
