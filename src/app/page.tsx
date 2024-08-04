import RecommendedPosts from "@/components/client/RecommendedPosts";
import UserInfoCard from "@/components/client/UserInfoCard";

export default function Home() {
  return (
    <div className="flex justify-center gap-5 w-full">
        <div className="w-full flex gap-10 md:flex-row flex-col text-center md:items-start m-2">
          <div className="flex-[3] hidden md:block">
            <UserInfoCard />
          </div>
          <div className="flex-[6]">
              <RecommendedPosts />
          </div>
          <div className="flex-[3] hidden md:block"></div>
        </div>
    </div>
  );
}