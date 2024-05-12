import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import PostCard from "./PostCard";

const RecommendedPosts = async ({currUser} : {currUser: any}) => {
    
    const recommendedPosts = await axios.get(`${API_HEAD}/posts/recommended/${currUser?._id}`).then((res) => res.data).catch((err) => console.error("Error", err));

  return (
    <div className="flex flex-col gap-4">

        {recommendedPosts?.map((post: any) => (
            <PostCard postData={post} currUser={currUser} key={post?._id}/>
        ))}

    </div>
  )
}

export default RecommendedPosts