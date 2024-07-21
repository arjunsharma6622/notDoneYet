import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import PostCard from "./PostCard";

const RecommendedPosts = async ({userId} : {userId: string}) => {

  const userData = await axios.get(`${API_HEAD}/user/getUser?userId=${userId}`)
  .then((res) => res.data)
  .catch((err) => console.error("Error", err));

  const recommendedPosts = await axios.get(`${API_HEAD}/posts/recommended/${userData?._id}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));

  return (
    <div className="flex flex-col gap-4">
      {recommendedPosts?.map((post: any) => (
        <PostCard postData={post} currUser={userData} key={post?._id} />
      ))}
    </div>
  );
};

export default RecommendedPosts;
