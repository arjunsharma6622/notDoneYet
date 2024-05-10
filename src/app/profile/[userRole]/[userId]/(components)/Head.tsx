import { followUser, toggleProfileLike, unfollowUser } from "@/actions/user";
import Link from "next/link";
import React from "react";
import { BiShare } from "react-icons/bi";
import { FiMapPin, FiMoreVertical } from "react-icons/fi";
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";

const Head = ({ userData, session }: any) => {
  const userRoles: { [key: string]: string } = {
    athlete: "Athlete",
    brand: "Brand",
    doctor: "Doctor",
    venueOwner: "Venue",
  };

  const handleFollowClick = async () => {
    "use server";
    try {
      console.log("Following user:", userData._id);
      console.log("Session user:", session?.user?._id);
      await followUser(userData._id, session?.user?._id);
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  const handleUnfollowClick = async () => {
    "use server";
    try {
      console.log("Unfollowing user:", userData._id);
      console.log("Session user:", session?.user?._id);
      await unfollowUser(userData._id, session?.user?._id);
    } catch (err) {
      console.error("Error unfollowing user:", err);
    }
  };

  const handleLikeProfile = async () => {
    "use server";
    try {
      await toggleProfileLike(session?.user?._id, userData._id);
    } catch (err) {
      console.error("Error liking user:", err);
    }
}


  return (
    <div>
      <div className="relative">
        <img
          src={
            userData.backgroundImg ||
            "https://www.fr.com/images/demo/fish-richardson-header-default.png"
          }
          alt=""
          className="w-full object-cover aspect-[4/1] rounded-tr-md rounded-tl-md"
        />
        <img
          src={
            userData.image ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt=""
          className="absolute left-6 -bottom-6 md:-bottom-10 border-white border-4 md:border-8 w-20 h-20 md:w-44 md:h-44 object-cover rounded-full"
        />
      </div>

      <div className="px-3 md:px-6 mt-10 flex items-start flex-col gap-3 justify-between">
        <div className="flex flex-col gap-0">
          <span className="text-xs">{userRoles[userData.role]}</span>

          <h1 className="text-3xl font-bold">{userData.name}</h1>

          <h1 className="mt-1">{userData.bio}</h1>
          <div className="flex items-center justify-start gap-1">
            <FiMapPin className="text-gray-500 w-4 h-4" />
            <p className="mt-1 text-sm text-gray-500">{`${userData.address?.city}, ${userData.address?.state}, ${userData.address?.country}`}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {userData.followers.includes(session?.user?._id) ? (
            <Link href={`/messages/`}>
              <button
                className="bg-blue-600 text-white py-1 px-4 rounded-sm"
                type="submit"
              >
                Message
              </button>
            </Link>
          ) : (
            <form action={handleFollowClick}>
              <button
                className="bg-blue-600 text-white py-1 px-4 rounded-sm"
                type="submit"
              >
                Follow
              </button>
            </form>
          )}


<form action={handleLikeProfile}>
          <button type="submit" className="px-2 py-2 rounded-full bg-pink-100 cursor-pointer flex items-center gap-2">
            <span className="text-pink-600 text-sm font-medium">{userData?.profileLikes?.length}</span>
            { userData.profileLikes.includes(session?.user?._id) ?
            <RiHeart2Fill className="text-pink-600 w-5 h-5" />
            :
            <RiHeart2Line className="text-pink-600 w-5 h-5" />
            }
          </button>
          </form>


          <div className="px-2 py-2 rounded-full bg-blue-100 cursor-pointer -scale-x-100">
            <BiShare className="text-blue-600 w-5 h-5" />
          </div>
          <div className="px-2 py-2 rounded-full bg-gray-100 cursor-pointer">
            <FiMoreVertical className="text-gray-600 w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
