import { followUser } from '@/actions/user';
import Link from 'next/link';
import React from 'react'
import { FiMessageCircle } from 'react-icons/fi';
import { toast } from 'sonner';
import useSWR from 'swr';

const RecommendedUsers = ({userData} : {userData: any}) => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data : allRecommendedUsers, error, isLoading } = useSWR(`/api/user/recommendedUsers/${userData?._id}`, fetcher)


    const handleFollowUser = async (userId : string) => {
        try {
          followUser(userId, userData?._id);
          console.log("done");
          toast.success("User Followed");
          console.log("done 2");
        } catch (err : any) {
            console.log(err);
          toast.error(err.message);
        }
      };


  return (
    <div className="w-full flex flex-col border rounded-md">
    {allRecommendedUsers?.map((user : any, index : number) => (
      <div
        key={user._id}
        className={`w-full flex justify-start items-start gap-4 p-2 md:p-4 ${
          index === allRecommendedUsers.length - 1
            ? "border-b-0"
            : "border-b"
        }`}
      >
        <div className="flex justify-center items-center">
          <img src={user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="rounded-full w-12 md:w-14 object-cover" referrerPolicy="no-referrer"/>
        </div>
        <div className="flex flex-col w-fit">
          <Link href={`/profile/${user.role === "venueOwner" ? "venue" : user?.role === "user" ? "athlete" : user.role}/${user._id}`}>
            <h1 className="font-semibold text-sm md:text-base">{user?.name}</h1>
          </Link>
          <div className="text-xs md:text-sm">
            <span>{user.followers?.length} followers</span>
            <span> · </span>
            <span>{user.following?.length} following</span>
          </div>
          <div>
            <p className="text-xs md:text-sm truncated-text">{user.bio}</p>
          </div>

          <div className="mt-1 md:mt-2">
            {user.followingUser ? (
              <button className="bg-primary text-white px-2 py-1 rounded-sm text-sm md:text-base flex items-center gap-1 md:gap-2 w-fit">
                <FiMessageCircle className="inline w-4 h-4 md:w-5 md:h-5" />
                <span>Message</span>
              </button>
            ) : (
              <button
                onClick={() => handleFollowUser(user._id)}
                className="bg-primary text-white px-2 py-1 rounded-sm w-fit text-sm md:text-base"
              >
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default RecommendedUsers