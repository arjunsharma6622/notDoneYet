import { FiMapPin } from "react-icons/fi";
import HeadActionOptions from "./HeadActionOptions";
import { Separator } from "@/components/ui/separator";

const Head = ({ userData, session }: any) => {
  const userRoles: { [key: string]: string } = {
    athlete: "Athlete",
    brand: "Brand",
    doctor: "Doctor",
    venueOwner: "Venue",
  };

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

      <div className="px-3 md:px-6 mt-6 flex items-start flex-col gap-3 justify-between">
        <div className="flex flex-col gap-0">
          <span className="text-xs">{userRoles[userData.role]}</span>

          <div className="flex gap-3 items-center">
            <h1 className="text-3xl font-bold">{userData.name}</h1>
            <Separator orientation="vertical" className="h-3 bg-gray-400" />
            <div className="flex items-center gap-2">
              <div className="text-sm font-normal flex gap-1 items-center px-2 py-1 bg-gray-200 rounded-md">
                {userData.followers?.length} <span>Followers</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-500"></div>
              <div className="text-sm font-normal flex gap-1 items-center px-2 py-1 bg-gray-200 rounded-md">
                {userData.following?.length} <span>Following</span>
              </div>
            </div>
          </div>

          <h1 className="mt-1 text-sm">{userData.bio}</h1>
          {userData.address && (
            <div className="flex items-center justify-start gap-1">
              <FiMapPin className="text-gray-500 w-4 h-4" />
              <p className="mt-1 text-sm text-gray-500">{`${userData.address?.city}, ${userData.address?.state}, ${userData.address?.country}`}</p>
            </div>
          )}
        </div>

        <HeadActionOptions userData={userData} session={session} />
      </div>
    </div>
  );
};

export default Head;
