// "use client"

// import axiosInstance from "@/utils/axiosInstance";
// import { useEffect, useState } from "react";
// import PostCard from "./PostCard";

// const RecommendedPosts = () => {
//   const [recommendedPosts, setRecommendedPosts] = useState<any>([]);

//   useEffect(() => {
//     axiosInstance
//       .get("/posts/user/recommendedPosts")
//       .then((res) => {
//         setRecommendedPosts(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);


//   return (
//     <div className="flex flex-col gap-4">
//       {recommendedPosts?.map((post: any) => (
//         <PostCard postData={post} key={post?._id} />
//       ))}
//     </div>
//   );
// };

// export default RecommendedPosts;


"use client"

import useSWR from "swr";
import axiosInstance from "@/utils/axiosInstance";
import PostCard from "./PostCard";
import PostsSkeleton from "../skeletons/Post/PostsSkeleton";

// Axios fetcher function
const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

const RecommendedPosts = () => {
  const { data: recommendedPosts, error, isLoading } = useSWR("/posts/user/recommendedPosts", fetcher);

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recommended posts.</div>;

  return (
    <>
      { recommendedPosts && !isLoading ?
        <div className="flex flex-col gap-4">
          {recommendedPosts?.map((post: any) => (
            <PostCard postData={post} key={post?._id} />
          ))}
        </div>
        :
        <PostsSkeleton cardsToShow={2} />
      }
    </>
  );
};

export default RecommendedPosts;