"use client"

import axiosInstance from "@/utils/axiosInstance";
import useSWR from "swr";
import PostsSkeleton from "../skeletons/Post/PostsSkeleton";
import PostCard from "./PostCard";

// Axios fetcher function
const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

const RecommendedPosts = () => {

  const { data: recommendedPosts, error, isLoading } = useSWR("/posts/user/recommendedPosts", fetcher);

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