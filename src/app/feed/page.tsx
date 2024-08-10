"use client"

import RecommendedPosts from "@/components/client/RecommendedPosts";
import UserInfoCard from "@/components/client/UserInfoCard";
import withAuth from "@/hocs/withAuth";
import AddPostInputBox from "./(components)/AddPostInputBox";
import CommunityCard from "./(components)/CommunityCard";

function Feed() {
  return (
    <div className="flex justify-center gap-5 w-full bg-gray-100">
      <div className="md:w-[90%] mx-2 md:mx-0 flex gap-6 md:flex-row flex-col text-center md:items-start m-2 md:m-4">
        <div className="flex-[4] hidden md:block">
          <UserInfoCard />
        </div>
        <div className="flex-[8] flex flex-col gap-2">
          <AddPostInputBox/>
          <RecommendedPosts />
        </div>
        <div className="flex-[4] hidden md:block">
          <CommunityCard />
        </div>
      </div>
    </div>
  );
}

export default withAuth(Feed)