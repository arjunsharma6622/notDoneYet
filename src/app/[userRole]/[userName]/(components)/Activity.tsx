import ProfilePostCard from "@/components/client/ProfilePostCard";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const Activity = ({ postData, userData }: { postData: any; userData: any }) => {
  return (
    <div className="flex flex-col gap-4 border-t py-2 px-3 md:px-6 md:py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">Posts</h2>
          <Link
            href={`/${userData?.role}/${userData?.userName}/posts`}
            className="flex text-sm items-center gap-0 text-blue-500"
          >
            All posts <FiArrowUpRight className="w-5 h-5" />
          </Link>
        </div>{" "}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {postData
          ?.slice(0, 3)
          ?.map((post: any, index: number) => (
            <ProfilePostCard currUser={userData} post={post} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Activity;
